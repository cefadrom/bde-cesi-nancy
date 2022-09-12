<script lang="ts">
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import HelloAssoPage from '$lib/member-dashboard/upgrade/HelloAssoPage.svelte';
    import UpgradeInstructions from '$lib/member-dashboard/upgrade/UpgradeInstructions.svelte';
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

    let step = 1;

    function handleNext() {
        step++;
    }
</script>


<Meta noindex title={$me.membership_status === 'aucun' ? 'Adhésion' : 'Cotisation'}/>


{#if step === 1}
    <SectionContainer header>
        <UpgradeInstructions type={$me.membership_status === 'aucun' ? 'adhesion' : 'cotisation'}
                             email={$me.email}
                             on:next={handleNext}/>
    </SectionContainer>
{:else if step === 2}
    <HelloAssoPage type={$me.membership_status === 'aucun' ? 'adhesion' : 'cotisation'}
                   on:next={handleNext}/>
{/if}
