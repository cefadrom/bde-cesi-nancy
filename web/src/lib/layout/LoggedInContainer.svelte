<script lang="ts">
    import { goto } from '$app/navigation';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import type { LoginStatus, UserProfile } from '$lib/types';
    import LoadingSpinner from '@bde-cesi-nancy/components/src/LoadingSpinner/LoadingSpinner.svelte';
    import { getContext } from 'svelte';

    export let header = false;

    const loginStatus = getContext<LoginStatus>('loginStatus');
    const me = getContext<UserProfile>('me');

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
