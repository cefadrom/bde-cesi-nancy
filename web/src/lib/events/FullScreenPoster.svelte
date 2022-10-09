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

    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 3rem;
        height: 3rem;
        border: 0.5rem solid var(--white);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin .75s linear infinite;
    }

    .poster-img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        position: relative;
    }

    @media all and (max-width: 900px) {
        .close {
            top: 2rem;
            right: 2rem;
        }
    }

    @keyframes spin {
        to {
            transform: translate(-50%, -50%) rotate(1turn);
        }
    }
</style>


<div class="poster" on:click={close} transition:fade|local={{duration: 100}}>
    <div class="loader"/>
    <img class="poster-img" src={poster} alt={title}/>
    <img class="close" src="icons/close-filled-black.svg" alt="x"/>
</div>
