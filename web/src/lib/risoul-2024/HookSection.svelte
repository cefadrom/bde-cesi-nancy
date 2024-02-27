<script>
    import SectionContainer from "$lib/layout/SectionContainer.svelte";
</script>

<style>
    .video {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 4rem;
    }

    @media (max-width: 850px) {
        .video {
            margin-top: 2rem;
        }
    }

    iframe {
        border: none;
        max-width: 100%;
        height: auto;
        aspect-ratio: 16/9;
    }
</style>

<SectionContainer>
    <h1 class="header-1">Une aventure inoubliable</h1>

    <p class="body">
        Vous rêvez d'une aventure hivernale inoubliable ? Rejoignez-nous pour une escapade au ski qui promet adrénaline,
        détente et souvenirs mémorables. Que vous soyez passionné de glisse ou simple novice, notre voyage vous promet
        une expérience sur les pistes à couper le souffle, des soirées chaleureuses et des moments de convivialité
        partagés entre amis. Préparez-vous à vivre des sensations fortes et à créer des souvenirs impérissables lors de
        ce périple à Risoul dans les Alpes du Sud !
    </p>

    <div class="video">
        <iframe width="850"
                height="480"
                src="https://www.youtube.com/embed/jn-BjHnKobw"
                title="Totally Snow Concept"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen/>
    </div>
</SectionContainer>
