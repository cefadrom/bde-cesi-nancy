<script lang="ts">
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import DashboardMessages from '$lib/member-dashboard/DashboardMessages.svelte';
    import Meta from '$lib/Meta.svelte';
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import MemberCard from '@bde-cesi-nancy/components/src/MemberCard/MemberCard.svelte';
    import { getContext } from 'svelte';
    import type { UserProfile } from '$lib/types';

    const me = getContext<UserProfile>('me');
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

    div[slot="cta"] {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
    }

    @media all and (max-width: 900px) {
        .dashboard-content {
            flex-direction: column;
        }

        div[slot="cta"] {
            gap: 1rem;
        }
    }
</style>


<SectionContainer header>
    <h1 class="header-1">Bonjour <span class="no-br">{$me.first_name} 👋</span></h1>
    <div class="dashboard-content">
        {#if $me.membership_status !== 'aucun'}
            <div class="card-container">
                <MemberCard user={$me} black={$me.membership_status === 'cotisant'}/>
            </div>
        {/if}
        <DashboardMessages status={$me.membership_status}/>
    </div>

    <div slot="cta">
        {#if $me.membership_status !== 'cotisant'}
            <a href="/member-dashboard/upgrade">
                {#if $me.membership_status === 'aucun'}
                    <Button icon="flame-filled-white">Adhérer</Button>
                {:else if $me.membership_status === 'adherent'}
                    <Button icon="flash-filled-white">Cotiser</Button>
                {/if}
            </a>
        {/if}

        <a href="/member-dashboard/settings">
            <Button icon="settings-filled-white">Paramètres</Button>
        </a>
    </div>
</SectionContainer>
