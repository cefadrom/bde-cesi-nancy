<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';

    export const load: Load = ({ status, error }) => {
        return {
            props: {
                status,
                error,
            },
        };
    };
</script>


<script lang="ts">
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import { onMount } from 'svelte';
    import { getErrorMessage } from '$lib/errorMessage.js';
    import Meta from '$lib/Meta.svelte';

    export let status: number;
    export let error: Error = new Error('Unknown error');

    onMount(() => {
        console.error(error instanceof Error || (error as Error).stack ? error.stack : error);
    });

    // Stack trace display - click 5 times on the status code in 4 seconds
    let statusCodeClicks = 0;

    function handleStatusCodeClick() {
        statusCodeClicks++;
        if (statusCodeClicks === 1)
            setTimeout(() => {
                statusCodeClicks = 0;
            }, 4000);
        if (statusCodeClicks === 5)
            alert(JSON.stringify(error, null, 2).replace(/\\n/g, '\n'));
    }
</script>


<style>
    .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: var(--white);
    }

    h2, h3, p {
        margin-top: 0;
    }

    p {
        margin-bottom: 1.5rem;
    }

    a {
        text-decoration: none;
        border-radius: .725rem;
        display: block;
    }

    a:not(:last-child) {
        margin-bottom: 1rem;
    }
</style>


<Meta noindex title="{error.name} {status}"/>


<div class="error-container">
    <h2 class="header-2" on:click={handleStatusCodeClick}>{error.name} {status}</h2>
    <h3 class="h3">{getErrorMessage(status, error)}</h3>
    <p class="body">Deux options s'offrent à vous. Faites le bon choix.</p>
    <a href="/">
        <Button icon="home-filled-white">Retourner à l'accueil</Button>
    </a>
    <a href="https://youtu.be/KRzeTKXRtno" rel="noreferrer noopener">
        <Button icon="heart-filled-white" variant="secondary">Se remettre en question sur sa vie</Button>
    </a>
</div>
