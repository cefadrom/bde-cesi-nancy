<script lang="ts">
    import { goto } from '$app/navigation';
    import { getDirectus, getLoginStatus, getUserProfile } from '$lib/context';
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';

    const directus = getDirectus();
    const me = getUserProfile();
    const loginStatus = getLoginStatus();

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
