<script lang="ts">
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import { createEventDispatcher } from 'svelte';

    export let type: 'adhesion' | 'cotisation';
    export let email: string;

    const dispatch = createEventDispatcher();
    let step = 1;

    function handleNext() {
        if (step < 3)
            step++;
        else
            dispatch('next');
    }

    function handleBack() {
        if (step > 1)
            step--;
        else
            window.history.back();
    }
</script>


<style>
    .popup-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .popup {
        width: 40rem;
        max-width: 100%;
        padding: 4rem;
        border-radius: 2rem;
        background-color: var(--light-gray);
    }

    h2 {
        margin: 0 0 2rem;
    }

    .action-row {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
    }

    @media all and (max-width: 850px) {
        .popup {
            padding: 2rem;
        }
    }

    @media all and (max-width: 500px) {
        .popup {
            padding: 0;
            background-color: inherit;
        }
    }

    @media all and (max-width: 400px) {
        .action-row {
            flex-direction: column;
            gap: 1rem;
        }
    }
</style>


<div class="popup-container">
    <div class="popup">
        <h2 class="header-2">
            {#if type === 'adhesion'}
                Adhésion
            {:else}
                Cotisation
            {/if}
        </h2>
        {#if step === 1}
            <p class="body">
                {type === 'adhesion' ? 'L\'adhésion se fait via' : 'La cotisation et son payement se font sur'}
                <span class="bold">HelloAsso</span>, puis
                {type === 'adhesion' ? 'est synchronisée' : 'sont synchronisés'}
                sur <span class="bold">bdecesinancy.fr</span>.
            </p>
        {:else if step === 2}
            <p class="body">
                Il est très important d'indiquer l'email viacesi de ce compte,
                <span class="bold">{email}</span>,
                afin d'effectuer la synchronisation.
            </p>
        {:else}
            <p class="body">
                Une fois terminée, cliquez sur le bouton
                <span class="bold">"Valider {type === 'adhesion' ? 'l\'adhésion' : 'la cotisation'}"</span>
                en bas de l'écran.
            </p>
        {/if}
        <div class="action-row">
            <Button block on:click={handleBack} variant="secondary">Retour</Button>
            <Button block on:click={handleNext}>{step < 3 ? 'Suivant' : 'Démarrer'}</Button>
        </div>
    </div>
</div>
