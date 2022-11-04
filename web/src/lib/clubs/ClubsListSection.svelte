<script lang="ts">
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import ClubCard from '@bde-cesi-nancy/components/src/ClubCard/ClubCard.svelte';
    import type { Club } from '@bde-cesi-nancy/types';

    export let clubs: Club[] = [];
</script>


<style>
    h2 {
        margin: 0 0 4rem 0;
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }
</style>


<SectionContainer gray anchor="clubs">
    <h2 class="header-2">Liste des clubs</h2>
    <div>
        {#each clubs as club (club.id)}
            <ClubCard {club}/>
        {/each}
    </div>
</SectionContainer>
