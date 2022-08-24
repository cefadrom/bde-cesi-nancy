<script lang="ts">
    import InputContainer from '../InputContainer/InputContainer.svelte';

    export let value = '';
    export let label: string | null = null;
    export let fullWidth: boolean = false;
    export let type: string = 'text';
    export let showInvalidBeforeFocus: boolean = false;
</script>


<InputContainer {...$$props} let:handleBlur let:props>
    {#if type === 'text'}
        <input {...props} type="text" bind:value on:keydown on:blur={handleBlur}/>
    {:else if type === 'email'}
        <input {...props} type="email" bind:value on:keydown on:blur={handleBlur}/>
    {/if}
</InputContainer>
