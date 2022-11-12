<script lang="ts">
    import { goto } from '$app/navigation';
    import { getUserProfile } from '$lib/context';
    import HelloAssoMembershipSection from '$lib/member-dashboard/upgrade/HelloAssoMembershipSection.svelte';
    import UpgradeInstructionsSection from '$lib/member-dashboard/upgrade/UpgradeInstructionsSection.svelte';
    import Meta from '$lib/Meta.svelte';
    import { onMount } from 'svelte';

    const me = getUserProfile();

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
