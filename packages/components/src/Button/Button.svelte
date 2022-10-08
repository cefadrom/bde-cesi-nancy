<script lang="ts">
    import type { ButtonVariant } from './button.d.ts';

    export let variant: ButtonVariant = 'primary';
    export let disabled: boolean = false;
    export let icon: string | null = null;
    export let block: boolean = false;
</script>


<style>
    button {
        border: none;
        outline: none;
        padding: .75rem 1rem;
        border-radius: .75rem;
        cursor: pointer;
        transition: box-shadow .2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.625rem;
    }

    button:disabled {
        opacity: .5;
        filter: grayscale(75%);
        cursor: not-allowed;
    }

    .btn-primary {
        background-color: var(--primary);
        color: var(--white);
    }

    .btn-primary:hover {
        box-shadow: 0 0 20px rgba(10, 51, 255, 0.3);
    }

    .btn-secondary {
        background-color: var(--dark-gray);
        color: var(--white);
    }

    .btn-secondary:hover {
        box-shadow: 0 0 20px rgba(127, 136, 178, 0.4);
    }

    .btn-outline {
        background-color: transparent;
        color: var(--black);
        outline: 2px solid var(--black);
    }

    .btn-outline:hover {
        box-shadow: 0 0 20px rgba(25, 28, 41, 0.2);
    }

    .btn-block {
        width: 100%;
    }

    img {
        height: 1.5rem;
        width: 1.5rem;
    }
</style>


<button class="button-text"
        {disabled}
        on:click
        class:btn-primary={variant === 'primary'}
        class:btn-secondary={variant === 'secondary'}
        class:btn-outline={variant === 'outline'}
        class:btn-block={block}>
    <slot>Button</slot>
    {#if icon}
        <img src="/icons/{icon}.svg" alt={icon}/>
    {/if}
</button>
