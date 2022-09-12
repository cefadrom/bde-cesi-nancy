<script lang="ts">
    import HelloAssoMembershipSection from '$lib/member-dashboard/upgrade/HelloAssoMembershipSection.svelte';
    import UpgradeInstructionsSection from '$lib/member-dashboard/upgrade/UpgradeInstructionsSection.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { Directus } from '$lib/types';
    import type { User } from '@bde-cesi-nancy/types';
    import { getContext, onMount } from 'svelte';
    import { goto } from '$app/navigation';

    const directus = getContext<Directus>('directus');
    const me = getContext<User>('me');

    onMount(() => {
        if (![ 'aucun', 'adherent' ].includes($me.membership_status))
            goto('/member-dashboard');
    });

    let instructionsShown = false;

    function handleNext() {
        instructionsShown = true;
    }
</script>


<Meta noindex title={$me.membership_status === 'aucun' ? 'Adhésion' : 'Cotisation'}/>


{#if !instructionsShown}
    <UpgradeInstructionsSection type={$me.membership_status === 'aucun' ? 'adhesion' : 'cotisation'}
                                email={$me.email}
                                on:next={handleNext}/>
{:else}
    <HelloAssoMembershipSection type={$me.membership_status === 'aucun' ? 'adhesion' : 'cotisation'}
                                on:next={handleNext}/>
{/if}
