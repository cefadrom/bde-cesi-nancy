<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let label: string | null = null;
    export let fullWidth: boolean = false;
    export let showInvalidBeforeFocus: boolean = false;

    let hideInvalid = !showInvalidBeforeFocus;

    const inputID = `input-${Math.random().toString(36).slice(2)}`;

    const dispatch = createEventDispatcher();

    function handleBlur(e) {
        hideInvalid = false;
        dispatch('blur', e);
    }

    // Erase all useless props that should not be passed to the inputs
    let props;
    $: props = {
        id: inputID,
        ...$$props,
        label: undefined,
        fullWidth: undefined,
        showInvalidBeforeFocus: undefined,
        autogrow: undefined,
        resizeY: undefined,
        'on:keydown': undefined,
    };
</script>


<style>
    .input-container {
        width: 200px;
        max-width: 100%;
    }

    .fullWidth {
        width: 100%;
        flex: 1;
    }

    label {
        margin-bottom: .5rem;
        display: block;
    }

    .required-star {
        color: red;
    }

    :global(.input-container :is(input, select, div textarea)) {
        width: 100%;
        display: block;
        padding: .625rem .75rem;
        outline: none !important;
        border: 1px solid var(--black);
        border-radius: .75rem;
        background-color: var(--white);
        font-family: inherit;
        font-size: inherit;
    }

    :global(.input-container :is(input, select, div textarea):focus) {
        border-color: var(--primary);
    }

    :global(.input-container :is(input, select, div textarea):disabled) {
        border-color: var(--gray);
        color: var(--gray);
        opacity: .8;
        cursor: not-allowed;
    }

    :global(.input-container:not(.hideInvalid) :is(input, select, div textarea):invalid) {
        border-color: var(--red);
    }

    :global(.input-container :is(input, select, div textarea)::placeholder) {
        color: var(--dark-gray);
    }
</style>


<div class="input-container" class:fullWidth class:hideInvalid>
    {#if label}
        <label class="body" for={inputID}>
            {label}
            {#if $$props.required}<span class="bold required-star">*</span>{/if}
        </label>
    {/if}
    <slot {handleBlur} id={inputID} {props}/>
</div>
