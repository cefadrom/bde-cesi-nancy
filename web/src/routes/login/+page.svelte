<script lang="ts">
    import { goto } from '$app/navigation';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { Directus, LoginStatus } from '$lib/types';
    import LoadingSpinner from '@bde-cesi-nancy/components/src/LoadingSpinner/LoadingSpinner.svelte';
    import type { User } from '@bde-cesi-nancy/types';
    import { getContext, onMount } from 'svelte';

    export let data: { refreshToken?: string, error?: string };

    const directus = getContext<Directus>('directus');
    const me = getContext<User>('me');
    const loginStatus = getContext<LoginStatus>('loginStatus');

    let error: string | null = null;
    let forbiddenError = false;

    onMount(async () => {
        try {

            if (data.error === 'FORBIDDEN') {
                forbiddenError = true;
                throw new Error('Accès interdit avec ce compte.');
            }

            if (data.error)
                throw new Error(`Une erreur inconnue est survenue: ${data.error}`);

            if (!data.refreshToken)
                throw new Error('Aucun token de refresh spécifié.');

            $loginStatus = 'LOGGING_IN';

            // Set refresh token to storage and delete potential old access token
            directus
                .storage
                .set('auth_refresh_token', data.refreshToken);
            directus
                .storage
                .delete('auth_token');

            // Get new access token
            await directus
                .auth
                .refresh();

            // Load user
            $me = await directus.users.me.read() as User;
            $loginStatus = 'LOGGED_IN';

            // Redirect to member page
            await goto('/member-dashboard');
        } catch (err) {
            console.error(err);
            error = err.message;
            $loginStatus = 'LOGGED_OUT';
        }
    });
</script>


<Meta title="Connexion en cours" noindex/>


<SectionContainer header>
    {#if forbiddenError}
        <h1 class="header-1">Accès refusé</h1>
        <p class="body">
            La connexion avec cette adresse mail vous à été refusée. Si vous êtes bien un étudiant au campus CESI de
            Nancy, <a href="/contact?category=info&subject=Impossible+de+me+connecter">veuillez nous contacter</a>.
        </p>
    {:else if error}
        <h1 class="header-1">Erreur</h1>
        <p class="body">{error}</p>
    {:else}
        <LoadingSpinner/>
    {/if}
</SectionContainer>
