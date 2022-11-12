<script lang="ts">
    import { goto } from '$app/navigation';
    import { getLoginStatus, getUserProfile } from '$lib/context';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import LoadingSpinner from '@bde-cesi-nancy/components/src/LoadingSpinner/LoadingSpinner.svelte';

    export let header = false;

    const me = getUserProfile();
    const loginStatus = getLoginStatus();

    let loggedIn: boolean;
    $: loggedIn = $loginStatus === 'LOGGED_IN' && $me !== null;

    $: if ($loginStatus === 'LOGGED_OUT')
        goto('/members');
</script>


{#if loggedIn}
    <slot/>
{:else}
    <SectionContainer {header}>
        <LoadingSpinner/>
    </SectionContainer>
{/if}
