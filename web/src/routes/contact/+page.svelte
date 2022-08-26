<script context="module" lang="ts">
    import { writable } from 'svelte/store';

    let isSubmitted = writable(false);
</script>


<script lang="ts">
    import { postContactForm } from '$lib/api/postContactForm';
    import ContactForm from '$lib/contact/ContactForm.svelte';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { IContactFormData } from '@bde-cesi-nancy/types/api';

    let isLoading = false;
    let error: string | null = null;

    function handleFormSubmit({ detail: form }: { detail: IContactFormData }) {
        isLoading = true;
        error = null;
        postContactForm(form)
            .then(() => {
                $isSubmitted = true;
            })
            .catch(err => {
                error = err.message;
            })
            .finally(() => {
                isLoading = false;
            });
    }
</script>


<style>
    p {
        background-color: var(--light-gray);
        border-radius: 2rem;
        padding: 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 30rem;
        text-align: center;
        color: var(--green);
    }

    @media all and (max-width: 850px) {
        p {
            padding: 2rem;
        }
    }

    @media all and (max-width: 500px) {
        p {
            padding: 0;
            background-color: inherit;
        }
    }
</style>


<Meta title="Contact"/>


<SectionContainer header>
    <h2 class="header-2">Contact 💬</h2>
    {#if !$isSubmitted}
        <ContactForm on:submit={handleFormSubmit} disabled={isLoading} {error}/>
    {:else}
        <p class="bold">Votre demande de contact à été transmise ! Nous vous répondrons dans les plus brefs délais !</p>
    {/if}
</SectionContainer>
