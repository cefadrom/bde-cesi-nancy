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
        <img alt="CESI" height="256" loading="lazy" src="/sponsors/cesi.png" width="256"/>
        <img alt="LCL" height="200" loading="lazy" src="/sponsors/lcl.png" width="256"/>
        <img alt="RedBull" height="256" loading="lazy" src="/sponsors/redbull.png" width="256"/>
        <img alt="En voiture Simone" height="134" loading="lazy" src="/sponsors/en-voiture-simone.png" width="256">
        <img alt="Les Arrangés du Bocal" height="256" loading="lazy" src="/sponsors/les-arranges-du-bocal.png"
             width="256">
        <img alt="Bloc Session" height="256" loading="lazy" src="/sponsors/bloc-session.png" width="256">
        <img alt="Cosmic Park" height="95" loading="lazy" src="/sponsors/cosmic-park.png" width="256">
        <img alt="Race system" height="100" loading="lazy" src="/sponsors/race-system.png" width="256">
    </div>
</SectionContainer>
