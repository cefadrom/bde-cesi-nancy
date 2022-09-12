<script lang="ts">
    import LoggedInContainer from '$lib/layout/LoggedInContainer.svelte';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import DashboardMessages from '../../lib/member-dashboard/DashboardMessages.svelte';
    import Meta from '$lib/Meta.svelte';
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import MemberCard from '@bde-cesi-nancy/components/src/MemberCard/MemberCard.svelte';
    import type { User } from '@bde-cesi-nancy/types';
    import { getContext } from 'svelte';

    const me = getContext<User>('me');
</script>


<Meta title="Espace membre" noindex/>


<style>
    .dashboard-content {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .card-container {
        flex: 1;
    }

    a {
        text-decoration: none;
    }

    @media all and (max-width: 900px) {
        .dashboard-content {
            flex-direction: column;
        }
    }
</style>


<LoggedInContainer header>
    <SectionContainer header hidecta={$me.membership_status === 'cotisant'}>
        <h1 class="header-1">Bonjour {$me.first_name} 👋</h1>
        <div class="dashboard-content">
            {#if $me.membership_status !== 'aucun'}
                <div class="card-container">
                    <MemberCard user={$me} black={$me.membership_status === 'cotisant'}/>
                </div>
            {/if}
            <DashboardMessages status={$me.membership_status}/>
        </div>

        <a slot="cta" href="/upgrade/{$me.membership_status === 'aucun' ? 'adherant' : 'cotisant'}">
            {#if $me.membership_status === 'aucun'}
                <Button icon="flame-filled-white">Adhérer</Button>
            {:else if $me.membership_status === 'adherant'}
                <Button icon="flash-filled-white">Cotiser</Button>
            {/if}
        </a>
    </SectionContainer>
</LoggedInContainer>
