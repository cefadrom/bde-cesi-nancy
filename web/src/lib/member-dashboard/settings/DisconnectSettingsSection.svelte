<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Directus, LoginStatus, UserProfile } from '$lib/types.js';
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import { getContext } from 'svelte';

    const directus = getContext<Directus>('directus');
    const me = getContext<UserProfile>('me');
    const loginStatus = getContext<LoginStatus>('loginStatus');

    let loading = false;

    async function handleLogout() {
        loading = true;
        await directus.auth.logout();
        $me = null;
        await goto('/');
        $loginStatus = 'LOGGED_OUT';
    }
</script>

<Button icon="logout-outline-white" on:click={handleLogout} disabled={loading}>
    Se déconnecter
</Button>
