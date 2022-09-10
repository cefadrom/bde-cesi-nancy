<script lang="ts">
    import { env } from '$env/dynamic/public';
    import '$lib/global.css';
    import type { LoginStatus } from '$lib/types';
    import Footer from '@bde-cesi-nancy/components/src/Footer/Footer.svelte';
    import Header from '@bde-cesi-nancy/components/src/Header/Header.svelte';
    import type { User } from '@bde-cesi-nancy/types';
    import { Directus } from '@directus/sdk';
    import { onMount, setContext } from 'svelte';
    import { writable } from 'svelte/store';

    const directus = new Directus(
        env.PUBLIC_DIRECTUS_URL,
        { auth: { mode: 'json' } },
    );
    const me = writable<User | null>(null);
    const loginStatus = writable<LoginStatus>('LOGGING_IN');

    setContext('directus', directus);
    setContext('me', me);
    setContext('loginStatus', loginStatus);

    // Tries to connect if a valid token is found
    onMount(async () => {
        try {
            if (!directus.storage.get('auth_refresh_token')) {
                $loginStatus = 'LOGGED_OUT';
                return;
            }
            $me = await directus.users.me.read({ fields: [ '*', 'promotion.*' ] }) as User;
            $loginStatus = 'LOGGED_IN';
        } catch {
            $loginStatus = 'LOGGED_OUT';
            directus.storage.delete('auth_refresh_token');
        }
    });
</script>


<style>
    main {
        min-height: 100vh;
    }
</style>


<Header/>
<main>
    <slot/>
</main>
<Footer/>
