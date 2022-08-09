<script lang="ts">
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import AboutSectionQuestion from '$lib/layout/SectionQuestion.svelte';
</script>


<style>
    h2 {
        margin: 0 0 6rem;
    }

    .img-container {
        position: relative;
        height: 0;
        display: flex;
        justify-content: center;
    }

    img {
        height: 20rem;
        position: absolute;
        transform: translate(-8rem, -25%);
    }

    @media all and (max-width: 1550px) {
        img {
            transform: translate(-14rem, -25%);
        }
    }

    @media all and (max-width: 1350px) {
        h2 {
            margin-bottom: 3rem;
        }
    }

    @media all and (max-width: 900px) {
        .img-container {
            display: none;
        }
    }
</style>


<SectionContainer header>
    <h2 class="header-2">Clubs 🏌️️</h2>
    <AboutSectionQuestion question="Qu'est-ce qu'un club ?">
        C’est un groupe d’apprenants en formation à CESI, adhérents à l’association BDE, qui se rassemble autour d’une
        ou de plusieurs activités.
    </AboutSectionQuestion>
    <div class="img-container">
        <img alt="Étudiants qui discutent" src="illustrations/group-chatting.svg"/>
    </div>
    <AboutSectionQuestion question="Quel est son but ?" right>
        Réunir les apprenants autour de passions communes et permettre l’organisation d’évènements divers avec un cadre
        légal.
    </AboutSectionQuestion>
    <AboutSectionQuestion question="Pourquoi créer un club ?">
        La création d’un club donnera de la visibilité à vos activités pour tous les apprenants de CESI. De plus, nous
        avons la conviction que le travail de chaque personne qui s’investit doit être mis en avant. Cela fait partie
        intégrante de notre communication.
    </AboutSectionQuestion>
</SectionContainer>
