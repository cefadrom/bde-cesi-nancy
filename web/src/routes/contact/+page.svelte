<script context="module" lang="ts">
    import { writable } from 'svelte/store';

    let isSubmitted = writable(false);
</script>


<script lang="ts">
    import ContactForm from '$lib/contact/ContactForm.svelte';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { IContactFormData } from '@bde-cesi-nancy/types/api';
    import type { Directus } from '$lib/types';
    import type { TransportError } from '@directus/sdk';
    import { getContext } from 'svelte';

    const directus = getContext<Directus>('directus');

    let isLoading = false;
    let error: string | null = null;

    function handleFormSubmit({ detail: form }: { detail: IContactFormData }) {
        isLoading = true;
        error = null;

        directus.transport.post('/contact', form)
            .then(() => {
                isSubmitted.set(true);
            })
            .catch((err: TransportError) => {
                error = err.response?.errors?.map(e => e.message)?.join(', ')
                    || err.response?.raw?.error
                    || err.message;
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
