<script lang="ts">
    import type { User } from '@bde-cesi-nancy/types';
    import { getContext } from 'svelte';
    import NotificationCategory from './NotificationCategory.svelte';

    const COMMUNICATION_ROLE_ID = 'f9f0c60b-7d00-4c4a-8d69-22cfa2859d75';
    const ADMIN_ROLE_ID = 'a313d7c6-db3e-4def-b14d-ae8d7e952bb5';

    const me = getContext<User>('me');

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

{#if $me.role === COMMUNICATION_ROLE_ID || $me.role === ADMIN_ROLE_ID}
    <NotificationCategory on:error={handleError} key="contact">Demande de contact</NotificationCategory>
{/if}

{#if $me.role === ADMIN_ROLE_ID}
    <NotificationCategory on:error={handleError} key="unauthorized-login">Connexion non autorisée</NotificationCategory>
    <NotificationCategory on:error={handleError} key="helloasso-log">Log HelloAsso</NotificationCategory>
{/if}
