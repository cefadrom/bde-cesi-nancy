<script lang="ts">
    import type { Recruitment } from '@bde-cesi-nancy/types';
    import Button from '../Button/Button.svelte';

    export let post: Recruitment;
</script>

<style>
    .post {
        background-color: var(--light-gray);
        border-radius: 1rem;
        height: auto;
        width: 40rem;
        max-width: 100%;
        padding: 1rem;
    }

    h3 {
        margin: 0;
    }

    .small {
        margin: .25rem 0 0;
    }

    .description {
        margin: 1rem 0;
    }

    a {
        text-decoration: none;
    }
</style>


<div class="post">
    <h3 class="header-3">{post.title}</h3>
    {#if post.subtitle}
        <p class="small">{post.subtitle}</p>
    {/if}
    <p class="description">{post.description}</p>
    <a href="/contact?category=bureau&subject=Postuler+comme+{post.title.replace(/ /g, '+')}">
        <Button icon="flash-filled-white">Je suis intéressé</Button>
    </a>
</div>
