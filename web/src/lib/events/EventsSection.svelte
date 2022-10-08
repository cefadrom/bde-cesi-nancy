<script lang="ts">
    import FullScreenPoster from '$lib/events/FullScreenPoster.svelte';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import EventCard from '@bde-cesi-nancy/components/src/EventCard/EventCard.svelte';
    import type { Event } from '@bde-cesi-nancy/types';

    export let events: Event[] = [];

    let fullScreenEvent: Event | null = null;

    function displayPoster(ev: CustomEvent<Event>) {
        fullScreenEvent = ev.detail;
    }

    function closePoster() {
        fullScreenEvent = null;
    }
</script>


<style>
    h2 {
        margin-top: 0;
    }

    .events {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }
</style>


<SectionContainer header>
    <h2 class="header-2">Évènements à venir 🎉</h2>
    {#if events.length}
        <div class="events">
            {#each events as event (event.id)}
                <EventCard {event} on:show-poster={displayPoster}/>
            {/each}
        </div>
    {:else}
        <p class="body">Aucun évènement à venir pour l'instant. Mais pas de panique, on y travaille 😉</p>
    {/if}
</SectionContainer>


{#if fullScreenEvent}
    <FullScreenPoster poster={fullScreenEvent.poster} title={fullScreenEvent.name} on:close={closePoster}/>
{/if}
