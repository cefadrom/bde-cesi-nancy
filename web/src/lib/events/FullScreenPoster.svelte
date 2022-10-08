<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    export let poster: string;
    export let title: string;

    const dispatch = createEventDispatcher();

    const close = () => dispatch('close');
</script>


<style>
    .poster {
        position: fixed;
        inset: 0;
        height: 100%;
        width: 100%;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.75);
        cursor: zoom-out;
    }

    .close {
        position: absolute;
        height: 3rem;
        width: 3rem;
        top: 4rem;
        right: 4rem;
        padding: .5rem;
        cursor: pointer;
        background-color: var(--white);
        border-radius: 1rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    }

    .poster-img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    @media all and (max-width: 900px) {
        .close {
            top: 2rem;
            right: 2rem;
        }
    }
</style>


<div class="poster" on:click={close} transition:fade|local={{duration: 100}}>
    <img src="icons/close-filled-black.svg" alt="x" class="close"/>
    <img class="poster-img" src={poster} alt={title}/>
</div>
