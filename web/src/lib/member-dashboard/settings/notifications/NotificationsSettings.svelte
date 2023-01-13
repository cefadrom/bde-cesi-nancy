<script lang="ts">
    import { getUserProfile } from '$lib/context';
    import NotificationCategory from './NotificationCategory.svelte';

    const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';
    const BUREAU_ROLE_ID = '87ab5db5-589a-4834-8233-6cd3ca79aae6';

    const me = getUserProfile();

    let error: string | null = null;

    function handleError(ev: CustomEvent<string>) {
        error = ev.detail;
    }
</script>


<style>
    .error {
        color: var(--red);
        font-weight: bold;
    }
</style>


{#if error}
    <p class="body error">{error}</p>
{/if}
<NotificationCategory on:error={handleError} key="announcement">Annonces</NotificationCategory>
<NotificationCategory on:error={handleError} key="club">Nouveau club</NotificationCategory>
<NotificationCategory on:error={handleError} key="event">Nouvel évènement</NotificationCategory>

{#if $me.role.id === COMMUNICATION_ROLE_ID || $me.role.id === BUREAU_ROLE_ID || $me.role.admin_access}
    <NotificationCategory on:error={handleError} key="contact">Demande de contact</NotificationCategory>
{/if}

{#if $me.role.admin_access || $me.role.id === BUREAU_ROLE_ID}
    <NotificationCategory on:error={handleError} key="unauthorized-login">Connexion non autorisée</NotificationCategory>
    <NotificationCategory on:error={handleError} key="helloasso-log">Log HelloAsso</NotificationCategory>
{/if}
