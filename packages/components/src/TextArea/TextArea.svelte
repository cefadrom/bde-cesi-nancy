<script lang="ts">
    import InputContainer from '../InputContainer/InputContainer.svelte';

    export let value = '';
    export let label: string | null = null;
    export let fullWidth: boolean = false;
    export let resizeY: boolean = false;
    export let autogrow: boolean = false;
    export let showInvalidBeforeFocus: boolean = false;

    // Autogrow textarea: https://stackoverflow.com/a/64792984
    let textArea: HTMLTextAreaElement;
    $: autogrow && textArea && (textArea.parentNode.dataset.replicatedValue = value);
</script>


<style>
    .grow-wrap.autogrow {
        display: grid;
    }

    .grow-wrap.autogrow::after {
        content: attr(data-replicated-value) " ";
        white-space: pre-wrap;
        visibility: hidden;
    }

    .grow-wrap textarea,
    .grow-wrap::after {
        width: 100%;
        display: block;
        padding: .625rem .75rem;
        outline: none !important;
        border: 1px solid var(--black);
        border-radius: .75rem;
        background-color: var(--white);
        font-family: inherit;
        grid-area: 1 / 1 / 2 / 2;
    }

    textarea {
        resize: none;
    }

    .grow-wrap.autogrow textarea {
        overflow: hidden;
    }

    .resizeY {
        resize: vertical;
    }
</style>


<InputContainer {...$$props} let:handleBlur let:props>
    <div class="grow-wrap" class:autogrow>
        <textarea {...props}
                  bind:this={textArea}
                  bind:value
                  class:resizeY
                  on:blur={handleBlur}
                  on:keydown/>
    </div>
</InputContainer>
