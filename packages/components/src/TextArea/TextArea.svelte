<script lang="ts">
    import InputContainer from '../InputContainer/InputContainer.svelte';

    export let value = '';
    export let label: string | null = null;
    export let fullWidth: boolean = false;
    export let resizeY: boolean = false;
    export let autogrow: boolean = false;
    export let showInvalidBeforeFocus: boolean = false;
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
        border-radius: .75rem;
        background-color: var(--white);
        font-family: inherit;
        grid-area: 1 / 1 / 2 / 2;
    }

    .grow-wrap::after {
        border: 1px solid transparent;
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
    <!-- Autogrow textarea: https://stackoverflow.com/a/64792984 -->
    <div class="grow-wrap" class:autogrow data-replicated-value={value}>
        <textarea {...props}
                  bind:value
                  class:resizeY
                  on:blur={handleBlur}
                  on:keydown/>
    </div>
</InputContainer>
