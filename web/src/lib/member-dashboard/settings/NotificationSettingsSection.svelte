<script lang="ts">
    import { env } from '$env/dynamic/public';
    import type { Directus } from '$lib/types';
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import { getContext } from 'svelte';
    import NotificationsSettings from './notifications/NotificationsSettings.svelte';

    const directus = <Directus>getContext('directus');

    let error: string | null = null;
    let state: 'default' | 'loading' | 'done' = 'default';
    let notificationPermission: NotificationPermission = Notification.permission;

    async function askNotificationPermissions() {
        if (state === 'loading' || state === 'done')
            return;

        error = null;
        state = 'loading';

        if (!'Notification' in window || !'serviceWorker' in navigator) {
            error = 'Les notifications ne sont pas supportées par votre navigateur';
            state = 'default';
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            error = 'Veuillez accepter les notification sur votre navigateur';
            state = 'default';
            return;
        }

        const registration = await navigator.serviceWorker.getRegistration();
        if (!registration) {
            error = 'Service worker non enregistré';
            state = 'default';
            return;
        }

        let subscription = await registration.pushManager.getSubscription();

        if (!subscription)
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: env.PUBLIC_VAPID_KEY,
            });

        try {
            await directus.transport.post('/push/subscribe', subscription.toJSON());
        } catch (e) {
            console.error(e);
            error = e instanceof Error ? e.message : e.toString();
        }

        state = 'done';
        notificationPermission = Notification.permission;
    }
</script>


<style>
    .error {
        color: var(--red);
        font-weight: bold;
    }
</style>


{#if notificationPermission === 'denied'}
    <p class="body error">Vous avez refusé les notifications</p>
{:else if notificationPermission === 'default'}
    <p class=" body">Les notifications ne sont pas activées.</p>
    {#if error}
        <p class="body error">{error}</p>
    {/if}
    <Button icon="notification-filled-white" on:click={askNotificationPermissions} disabled={state === 'loading'}>
        Activer les notifications
    </Button>
{:else}
    {#await askNotificationPermissions()}
        Chargement des préférences...
    {:then _}
        {#if error}
            <p class="body error">Erreur lors de l'activation des notifications : {error}</p>
        {:else}
            <NotificationsSettings/>
        {/if}
    {/await}
{/if}
