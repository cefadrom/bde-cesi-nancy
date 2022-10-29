<script lang="ts">
    import { env } from '$env/dynamic/public';
    import type { Directus } from '$lib/types';
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import { getContext } from 'svelte';

    const directus = <Directus>getContext('directus');

    let error: string | null = null;
    let loading = false;

    async function askNotificationPermissions() {
        if (loading)
            return;

        error = null;
        loading = true;

        if (!'Notification' in window || !'serviceWorker' in navigator) {
            error = 'Les notifications ne sont pas supportées par votre navigateur';
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            error = 'Vous devez accepter les notifications pour pouvoir vous abonner';
            return;
        }

        const registration = await navigator.serviceWorker.getRegistration();
        if (!registration) {
            error = 'Service worker non enregistré';
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
    }
</script>


<style>
    .error {
        color: var(--red);
        font-weight: bold;
    }
</style>


<h3 class="header-3">Notifications</h3>
{#if !'Notification' in window || !'serviceWorker' in navigator}
    <!--{#if !'Notification' in window || !'serviceWorker' in navigator || !navigator.serviceWorker.controller}-->
    <p class="body error">Les notifications ne sont pas supportées par votre navigateur</p>
{:else}
    {#if window.Notification.permission === 'denied'}
        <p class="body error">Vous avez refusé les notifications</p>
    {:else}
        <p class=" body">Les notifications ne sont pas activées.</p>
        {#if error}
            <p class="body error">{error}</p>
        {/if}
        <Button icon="notification-filled-white" on:click={askNotificationPermissions} disabled={loading}>
            Activer les notifications
        </Button>
    {/if}
{/if}
