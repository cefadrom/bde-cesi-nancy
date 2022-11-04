<script lang="ts">
    import type { Directus, UserProfile } from '$lib/types';
    import Toggle from '@bde-cesi-nancy/components/src/Toggle/Toggle.svelte';
    import { createEventDispatcher, getContext, onMount } from 'svelte';

    const directus = getContext<Directus>('directus');
    const me = getContext<UserProfile>('me');

    export let key: string;

    const dispatch = createEventDispatcher();

    let checked = false;
    onMount(() => {
        checked = $me.subscriptions?.includes(key);
    });

    function setSubscriptionState(enabled: boolean) {
        $me.subscriptions = enabled
            ? [ ...($me.subscriptions || []), key ]
            : $me.subscriptions?.filter((k) => k !== key);

        // Used to revert the state if the request fails
        checked = enabled;
    }

    async function handleToggle(event: CustomEvent<boolean>) {
        // Update the `me` context locally
        setSubscriptionState(event.detail);

        // Update the user on the server
        await directus
            .transport
            .patch(`/push/settings`, {
                subscriptions: $me.subscriptions,
            })
            .catch(({ errors }) => {
                // If the request fails, revert the local changes
                setSubscriptionState(!event.detail);
                dispatch('error', errors[0].message);
            });
    }
</script>


<style>
    label {
        display: flex;
        align-items: center;
        gap: .5rem;
        padding: .2rem 0;
    }
</style>


<label>
    <Toggle bind:checked on:toggle={handleToggle}/>
    <span class="body">
        <slot/>
    </span>
</label>
