<script lang="ts">
    import { env } from '$env/dynamic/public';
    import { getUserProfile } from '$lib/context';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import DashboardMessages from '$lib/member-dashboard/DashboardMessages.svelte';
    import Meta from '$lib/Meta.svelte';
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import MemberCard from '@bde-cesi-nancy/components/src/MemberCard/MemberCard.svelte';

    const me = getUserProfile();

    const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';
    const CAFET_ROLE_ID = 'af32a550-a3c4-47fa-b418-bcd35b9a0ffe';
    const BUREAU_ROLE_ID = '87ab5db5-589a-4834-8233-6cd3ca79aae6';
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

        {#if $me.role.admin_access || $me.role.id === COMMUNICATION_ROLE_ID || $me.role.id === CAFET_ROLE_ID || $me.role.id === BUREAU_ROLE_ID}
            <a href="{env.PUBLIC_DIRECTUS_URL}/admin/">
                <Button icon="cloud-filled-white">Directus</Button>
            </a>
        {/if}
    </div>
</SectionContainer>
