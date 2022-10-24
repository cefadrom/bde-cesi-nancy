<script lang="ts">
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import RecruitmentCard from '@bde-cesi-nancy/components/src/RecruitmentCard/RecruitmentCard.svelte';
    import type { Recruitment } from '@bde-cesi-nancy/types';

    export let posts: Recruitment[] = [];
</script>


<style>
    h2 {
        margin: 0 0 2rem;
    }

    .posts {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }
</style>


<SectionContainer anchor="recruitment">
    <h2 class="header-2">Le BDE <span class="no-br">recrute !</span> 💪</h2>

    <div class="posts">
        {#each posts as post (post.id)}
            <RecruitmentCard {post}/>
        {/each}
    </div>
</SectionContainer>
