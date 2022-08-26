<script lang="ts">
    import InputContainer from '../InputContainer/InputContainer.svelte';

    export let value: string | null = null;
    export let options: { [key: string]: string } = {};
    export let label: string | null = null;
    export let defaultChoice: string | null = null;
    export let fullWidth: boolean = false;
    export let showInvalidBeforeFocus: boolean = false;
</script>


<style>
    select {
        appearance: initial;
        color: inherit;
    }

    .select-wrapper {
        position: relative;
    }

    .select-wrapper::after {
        content: "";
        background-image: url('/icons/caret-down-filled-black.svg');
        height: 1rem;
        width: 1rem;
        top: 50%;
        right: .9rem;
        position: absolute;
        transform: translateY(-50%);
    }
</style>


<InputContainer {...$$props} let:handleBlur let:props>
    <div class="select-wrapper">
        <select {...props} bind:value on:blur={handleBlur} on:change>
            {#if defaultChoice}
                <option disabled selected value={null}>{defaultChoice}</option>
            {/if}
            {#each Object.entries(options) as [key, value] (key)}
                <option value={key}>{value}</option>
            {/each}
        </select>
    </div>
</InputContainer>
