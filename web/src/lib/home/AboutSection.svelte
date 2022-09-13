<script>
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
            transform: translate(-12rem, -25%);
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


<SectionContainer>
    <h2 class="header-2">À propos du <span class="no-br">BDE 🤔</span></h2>
    <AboutSectionQuestion question="Qu'est-ce qu'un BDE ?">
        Le Bureau Des Élèves (BDE) est une association à but non-lucratif qui a pour but de donner un cadre légal à
        toutes les manifestations extra-scolaires sur le campus.
    </AboutSectionQuestion>
    <div class="img-container">
        <img alt="Étudiants" loading="lazy" src="illustrations/student-friends.svg"/>
    </div>
    <AboutSectionQuestion question="Quel est son rôle ?" right>
        Le rôle du BDE est de fournir un cadre légal à toute organisation des manifestations. Il s’occupe aussi
        d’organiser des évènements, mais surtout, il accompagne les apprenants dans leurs projets associatifs pour le
        <span class="no-br">campus !</span>
    </AboutSectionQuestion>
    <AboutSectionQuestion question="Qui organise tout ça ?">
        Le BDE est dirigé par des apprenants bénévoles avec une volonté de donner vie au campus et renforcer le lien
        <span class="no-br">inter-promotions !</span>
    </AboutSectionQuestion>
</SectionContainer>
