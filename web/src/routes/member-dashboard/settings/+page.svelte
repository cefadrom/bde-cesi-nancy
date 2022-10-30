<script>
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import NotificationSettings from '$lib/member-dashboard/settings/NotificationSettings.svelte';
    import Meta from '$lib/Meta.svelte';
    import { browser } from '$app/environment';
</script>


<style>
    .error {
        color: var(--red);
        font-weight: bold;
    }
</style>


<Meta title="Paramètres utilisateur"/>


<SectionContainer header>
    <h2 class="header-2">Paramètres utilisateur ⚙️</h2>

    <h3 class="header-3">Notifications</h3>
    {#if !browser}
        <p>Chargement...</p>
    {:else if !'Notification' in window || !'serviceWorker' in navigator}
        <p class="body error">Les notifications ne sont pas supportées par votre navigateur.</p>
    {:else if !navigator.serviceWorker.controller}
        <p class="body error">Le service worker n'est pas enregistré. Veuillez rafraichir la page.</p>
    {:else}
        <NotificationSettings/>
    {/if}
</SectionContainer>
