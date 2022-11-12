<script lang="ts">
    import type { Event } from '@bde-cesi-nancy/types';
    import { createEventDispatcher } from 'svelte';
    import Button from '../Button/Button.svelte';

    export let event: Event;

    const dispatch = createEventDispatcher();

    function formatDate(date: Date, hideHours = event.hide_hours): string {
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            ...(hideHours ? {} : { hour: 'numeric', minute: 'numeric' }),
        });
    }

    function formatTime(date: Date): string {
        return date.toLocaleTimeString('fr-FR', {
            hour: 'numeric',
            minute: 'numeric',
        });
    }

    const isSameDay = () => event.date_start.toLocaleDateString() === event.date_end!.toLocaleDateString();

    function displayPoster() {
        dispatch('show-poster', event);
    }
</script>


<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: start;
        width: 50rem;
        height: 18.75rem;
        background-color: var(--light-gray);
        border-radius: 1rem;
    }

    img {
        width: 18.75rem;
        min-width: 18.75rem;
        height: 18.75rem;
        border-radius: 1rem 0 0 1rem;
        object-fit: contain;
        cursor: zoom-in;
    }

    .information {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        width: 100%;
        height: 100%;
        gap: 1rem;
    }

    h3 {
        margin: 0 0 .5rem;
    }

    .description {
        white-space: pre-wrap;
    }

    .ctas {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .ctas a {
        text-decoration: none;
    }

    @media all and (max-width: 900px) {
        .container {
            flex-direction: column;
            width: 100%;
            max-width: 31.25rem;
            height: 100%;
        }

        img {
            width: 100%;
            min-width: 0;
            max-width: 100%;
            height: auto;
            max-height: 18.75rem;
            border-radius: 1rem 1rem 0 0;
        }
    }
</style>


<div class="container">
    <img src="{event.poster}?key=event-thumb" alt={event.name} on:click={displayPoster}/>
    <div class="information">
        <div class="title">
            <h3 class="header-3">{event.name}</h3>
            <div class="small">
                {#if event.date_end}
                    {#if isSameDay()}
                        Le {formatDate(event.date_start, true)}
                        de {formatTime(event.date_start)} à {formatTime(event.date_end)}
                    {:else}
                        Du {formatDate(event.date_start)} au {formatDate(event.date_end)}
                    {/if}
                {:else}
                    Le {formatDate(event.date_start)}
                {/if}
            </div>
        </div>

        <div class="description body">
            {event.description}
        </div>

        <div class="ctas">
            {#if event.cta_text && event.cta_link}
                <a href={event.cta_link} rel="noopener,noreferrer">
                    <Button variant="primary" icon="arrow-redo-filled-white">{event.cta_text}</Button>
                </a>
            {/if}
            <Button variant="outline" icon="document-filled-black" on:click={displayPoster}>Voir l'affiche</Button>
        </div>
    </div>
</div>
