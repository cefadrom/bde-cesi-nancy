<script lang="ts">
    import { env } from '$env/dynamic/public';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import RecruitmentCard from '@bde-cesi-nancy/components/src/RecruitmentCard/RecruitmentCard.svelte';
    import type { Recruitment } from '@bde-cesi-nancy/types';
    import { onMount } from 'svelte';

    let posts: Recruitment[] = [];
    let loading = true;

    onMount(async () => {
        const res = await fetch(`${env.PUBLIC_DIRECTUS_URL}/items/recruitment`);
        posts = (await res.json()).data;
        loading = false;
    });
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


{#if loading || posts.length}
    <SectionContainer>
        <h2 class="header-2">Le BDE <span class="no-br">recrute !</span> 💪</h2>

        {#if loading}
            <p>Chargement des postes...</p>
        {:else}
            <div class="posts">
                {#each posts as post (post.id)}
                    <RecruitmentCard {post}/>
                {/each}
            </div>
        {/if}
    </SectionContainer>
{/if}
