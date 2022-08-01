<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let checked: boolean = false;
    export let disabled: boolean = false;

    const inputID = `checkbox-${Math.random().toString(36).slice(2)}`;

    const dispatch = createEventDispatcher();

    function onToggle(event) {
        dispatch('toggle', event);
    }
</script>

<style>
    input {
        display: none;
    }

    input + label {
        display: inline-block;
        position: relative;
        width: 36px;
        height: 20px;
        border-radius: 10px;
        background-color: #b9bed5;
        cursor: pointer;
        user-select: none;
        transition: background-color 0.2s ease-in-out;
    }

    input:disabled + label {
        opacity: .5;
        cursor: not-allowed;
    }

    input:checked + label {
        background: #0a33ff;
    }

    input + label:before {
        content: '';
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 1em;
        background-color: #fafbff;
        position: absolute;
        left: 2px;
        top: 2px;
        transition: left 0.2s ease-in-out;
    }

    input:checked + label:before {
        left: 18px; /* 36 - (2 + 16) */
    }
</style>

<input type="checkbox" bind:checked id={inputID} on:change={onToggle} role="checkbox" {disabled}/>
<label for={inputID}></label>
