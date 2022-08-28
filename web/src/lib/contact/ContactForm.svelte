<script lang="ts">
    import { page } from '$app/stores';
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import Input from '@bde-cesi-nancy/components/src/Input/Input.svelte';
    import Select from '@bde-cesi-nancy/components/src/Select/Select.svelte';
    import TextArea from '@bde-cesi-nancy/components/src/TextArea/TextArea.svelte';
    import type { IContactFormData } from '@bde-cesi-nancy/types/api';
    import { createEventDispatcher } from 'svelte';

    export let disabled = false;
    export let error: string | null = null;

    const form: IContactFormData = {
        firstName: '',
        lastName: '',
        email: '',
        category: '',
        subject: '',
        message: '',
    };

    const categories = {
        bureau: 'Bureau',
        club: 'Club',
        communication: 'Communication',
        info: 'Informatique / Site web',
        autre: 'Autre',
    };

    if ($page.url.searchParams.has('category') && categories[$page.url.searchParams.get('category')])
        form.category = $page.url.searchParams.get('category');

    if ($page.url.searchParams.has('subject'))
        form.subject = $page.url.searchParams.get('subject');

    const dispatch = createEventDispatcher();

    function handleFormSubmit() {
        if (!disabled)
            dispatch('submit', form);
    }
</script>


<style>
    form {
        background-color: var(--light-gray);
        border-radius: 2rem;
        padding: 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    .error {
        width: 100%;
        color: var(--red);
        margin: 0;
    }

    .input-group {
        width: 100%;
        display: flex;
        gap: 4rem;
    }

    @media all and (max-width: 850px) {
        form {
            padding: 2rem;
        }

        .input-group {
            flex-direction: column;
            gap: 2rem;
        }
    }

    @media all and (max-width: 500px) {
        form {
            padding: 0;
            background-color: inherit;
        }
    }
</style>


<form on:submit|preventDefault={handleFormSubmit}>
    {#if error}
        <p class="error bold">Une erreur est survenue : {error}</p>
    {/if}

    <div class="input-group">
        <Input type="text"
               fullWidth
               label="Nom"
               minlength="2"
               maxlength="50"
               {disabled}
               bind:value={form.lastName}
               required/>
        <Input type="text"
               fullWidth
               label="Prénom"
               minlength="2"
               maxlength="50"
               {disabled}
               bind:value={form.firstName}
               required/>
    </div>

    <div class="input-group">
        <Input type="email"
               fullWidth
               label="Email (viacesi de préférence)"
               {disabled}
               bind:value={form.email}
               required/>
        <Select label="Catégorie"
                fullWidth
                required
                {disabled}
                bind:value={form.category}
                options={categories}/>
    </div>

    <Input type="text"
           fullWidth
           label="Objet de la demande"
           minlength="2"
           maxlength="128"
           {disabled}
           bind:value={form.subject}
           required/>

    <TextArea label="Message"
              fullWidth
              autogrow
              minlength="2"
              maxlength="1024"
              {disabled}
              bind:value={form.message}
              required/>

    <div>
        <Button icon="arrow-forward-circle-filled-white" {disabled}>Envoyer</Button>
    </div>
</form>
