<script>
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
</script>


<style>
    h2 {
        margin: 0 0 4rem;
    }

    .sponsors-grid {
        display: grid;
        grid-template-columns: repeat(3, 12rem);
        grid-gap: 4rem;
        align-items: center;
        justify-content: center;
        justify-items: center;
        max-width: 100%;
    }

    img {
        width: 100%;
        height: auto;
        max-width: 12rem;
    }

    img:last-of-type {
        grid-area: 3 / 2 / 4 / 3;
    }

    @media all and (max-width: 900px) {
        .sponsors-grid {
            grid-template-columns: repeat(2, 10rem);
        }

        img:last-of-type {
            grid-area: unset;
        }
    }

    @media all and (max-width: 500px) {
        h2 {
            margin-bottom: 2rem;
        }

        .sponsors-grid {
            grid-template-columns: repeat(1, 100%);
            grid-gap: 2rem;
        }

        img {
            max-width: 8rem;
        }
    }
</style>


<SectionContainer anchor="partners" gray>
    <h2 class="header-2">Nos partenaires 💛</h2>
    <div class="sponsors-grid">
        <img alt="CESI" height="836" loading="lazy" src="/sponsors/cesi.png" width="836"/>
        <img alt="LCL" height="230" loading="lazy" src="/sponsors/lcl.png" width="294"/>
        <img alt="RedBull" height="512" loading="lazy" src="/sponsors/redbull.png" width="512"/>
        <img alt="En voiture Simone" height="537" loading="lazy" src="/sponsors/en-voiture-simone.png" width="1024">
        <img alt="Les Arrangés du Bocal" height="499" loading="lazy" src="/sponsors/les-arranges-du-bocal.png"
             width="499">
        <img alt="Bloc Session" height="400" loading="lazy" src="/sponsors/bloc-session.png" width="400">
        <img alt="Cosmic Park" height="187" loading="lazy" src="/sponsors/cosmic-park.png" width="500">
    </div>
</SectionContainer>
