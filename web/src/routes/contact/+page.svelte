<script context="module" lang="ts">
    import { writable } from 'svelte/store';

    let isSubmitted = writable(false);
</script>


<script lang="ts">
    import ContactForm from '$lib/contact/ContactForm.svelte';
    import ContactSuccessMessage from '$lib/contact/ContactSuccessMessage.svelte';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { IContactFormData } from '@bde-cesi-nancy/types/api';
    import type { TransportError } from '@directus/sdk';
    import { getDirectus } from '$lib/context';

    const directus = getDirectus();

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


<Meta title="Contact"/>


<SectionContainer header>
    <h2 class="header-2">Contact 💬</h2>
    {#if !$isSubmitted}
        <ContactForm on:submit={handleFormSubmit} disabled={isLoading} {error}/>
    {:else}
        <ContactSuccessMessage/>
    {/if}
</SectionContainer>
