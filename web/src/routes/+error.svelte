<script lang="ts">
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import { onMount } from 'svelte';
    import { getErrorMessage } from '$lib/errorMessage.js';
    import Meta from '$lib/Meta.svelte';
    import { page } from '$app/stores';

    onMount(() => {
        console.error($page.error instanceof Error || ($page.error as Error).stack
            ? ($page.error as Error).stack
            : $page.error);
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
            alert(JSON.stringify($page.error, null, 2).replace(/\\n/g, '\n'));
    }


    const questString = 'pedroquest';
    let currentQuestString = '';

    function handlePageKeypress(e) {
        currentQuestString += e.key;

        if (!questString.startsWith(currentQuestString)) {
            currentQuestString = '';
            return;
        }

        if (currentQuestString !== questString)
            return;

        currentQuestString = '';
        window.location = 'https://youtu.be/z-y5iKCKm7U';
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


<Meta noindex title="Erreur {$page.status}"/>


<svelte:window on:keypress={handlePageKeypress}/>


<div class="error-container">
    <h2 class="header-2" on:click={handleStatusCodeClick}>Erreur {$page.status}</h2>
    <h3 class="h3">{getErrorMessage($page.status, $page.error)}</h3>
    <p class="body">Deux options s'offrent à vous. Faites le bon choix.</p>
    <a href="/">
        <Button icon="home-filled-white">Retourner à l'accueil</Button>
    </a>
    <a href="https://youtu.be/KRzeTKXRtno" rel="noreferrer noopener">
        <Button icon="heart-filled-white" variant="secondary">Se remettre en question sur sa vie</Button>
    </a>
</div>
