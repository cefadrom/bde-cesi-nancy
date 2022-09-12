<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    export let title: string | null = null;

    const dispatch = createEventDispatcher();

    function handleBackdropClick() {
        dispatch('backdropclick');
    }
</script>


<style>
    .popup-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }

    .popup {
        width: 40rem;
        max-width: 100%;
        padding: 4rem;
        margin: 1rem;
        border-radius: 2rem;
        background-color: var(--light-gray);
    }

    h2 {
        margin: 0 0 3rem 0;
    }

    .cta-bar {
        margin-top: 3rem;
        display: flex;
        justify-content: space-between;
        gap: 2rem;
    }

    @media all and (max-width: 850px) {
        .popup {
            padding: 2rem;
        }

        .cta-bar {
            gap: 1rem;
        }
    }

    @media all and (max-width: 500px) {
        .popup {
            padding: 1rem;
            border-radius: 1rem;
        }

        .cta-bar {
            flex-direction: column;
        }
    }
</style>


<div class="popup-container" on:click|self={handleBackdropClick} transition:fade|local={{duration: 100}}>
    <div class="popup">
        {#if title}
            <h2 class="header-2">{title}</h2>
        {/if}
        <slot/>
        {#if $$slots.cta || ($$slots['cta-l'] && $$slots['cta-r'])}
            <div class="cta-bar">
                <slot name="cta"/>
                <slot name="cta-l"/>
                <slot name="cta-r"/>
            </div>
        {/if}
    </div>
</div>
