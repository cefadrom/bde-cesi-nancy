<script lang="ts">
    import EventsSection from '$lib/events/EventsSection.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { Event } from '@bde-cesi-nancy/types';

    export let data: { events: Event[] };
</script>


<Meta title="Évènements"/>


<EventsSection events={data.events}/>
