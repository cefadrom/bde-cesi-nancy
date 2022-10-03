<script lang="ts">
    import { goto } from '$app/navigation';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { Directus, LoginStatus } from '$lib/types';
    import LoadingSpinner from '@bde-cesi-nancy/components/src/LoadingSpinner/LoadingSpinner.svelte';
    import type { Promotion, User } from '@bde-cesi-nancy/types';
    import { getContext, onMount } from 'svelte';
    import { getUserProfile } from '$lib/api/getUserProfile';

    export let data: { error?: string };

    const directus = getContext<Directus>('directus');
    const me = getContext<User<Promotion>>('me');
    const loginStatus = getContext<LoginStatus>('loginStatus');

    let error: string | null = null;
    let errorCode: null | 'FORBIDDEN' | 'NO_COOKIE' = null;

    onMount(async () => {
        try {

            if (data.error === 'FORBIDDEN') {
                errorCode = 'FORBIDDEN';
                throw new Error('Accès interdit avec ce compte.');
            }

            if (data.error === 'NO_COOKIE') {
                errorCode = 'NO_COOKIE';
                throw new Error('Le cookie de connexion n\'a pas été trouvé.');
            }

            if (data.error)
                throw new Error(`Une erreur inconnue est survenue: ${data.error}`);

            $loginStatus = 'LOGGING_IN';

            // Get new access token
            await directus.auth.refresh();

            // Load user
            $me = await getUserProfile(directus);
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
    {#if errorCode === 'FORBIDDEN'}
        <h1 class="header-1">Accès refusé</h1>
        <p class="body">
            La connexion avec cette adresse mail vous à été refusée. Si vous êtes bien un étudiant au campus CESI de
            Nancy, <a href="/contact?category=info&subject=Impossible+de+me+connecter+(connexion+refusée)">veuillez nous
            contacter</a>.
        </p>
    {:else if errorCode === 'NO_COOKIE'}
        <h1 class="header-1">Erreur de connexion</h1>
        <p class="body">
            Impossible de trouver le cookie d'authentification. Assurez-vous que les cookies sont bien activés sur
            votre navigateur et <a href="/members">réessayez</a>. Si le problème persiste,
            <a href="/contact?category=info&subject=Impossible+de+me+connecter+(cookies)">contactez-nous</a>.
        </p>
    {:else if error}
        <h1 class="header-1">Erreur</h1>
        <p class="body">{error}</p>
    {:else}
        <LoadingSpinner/>
    {/if}
</SectionContainer>
