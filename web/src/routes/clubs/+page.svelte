<script lang="ts">
    import ClubsListSection from '$lib/clubs/ClubsListSection.svelte';
    import WhatsAClubSection from '$lib/clubs/WhatsAClubSection.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { Club } from '@bde-cesi-nancy/types';

    export let data: { clubs: Club[] };
</script>


<Meta title="Clubs"/>


<WhatsAClubSection/>
{#if data.clubs.length > 0}
    <ClubsListSection clubs={data.clubs}/>
{/if}
