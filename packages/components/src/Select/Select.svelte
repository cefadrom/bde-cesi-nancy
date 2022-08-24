<script lang="ts">
    import InputContainer from '../InputContainer/InputContainer.svelte';

    export let value: string | null = null;
    export let options: { [key: string]: string } = {};
    export let label: string | null = null;
    export let defaultChoice: string | null = null;
    export let fullWidth: boolean = false;
    export let showInvalidBeforeFocus: boolean = false;
</script>


<InputContainer {...$$props} let:handleBlur let:props>
    <select {...props} bind:value on:blur={handleBlur} on:change>
        {#if defaultChoice}
            <option disabled selected value={null}>{defaultChoice}</option>
        {/if}
        {#each Object.entries(options) as [key, value] (key)}
            <option value={key}>{value}</option>
        {/each}
    </select>
</InputContainer>
