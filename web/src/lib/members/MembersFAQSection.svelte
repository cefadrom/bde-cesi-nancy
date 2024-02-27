<script lang="ts">
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import AboutSectionQuestion from '$lib/layout/SectionQuestion.svelte';
    import MicrosoftLoginButton from '$lib/members/MicrosoftLoginButton.svelte';
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

    .cta {
        height: 3rem;
        width: auto;
        max-width: 100%;
        cursor: pointer;
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
    <h2 class="header-2">Espace membre 👤️</h2>
    <AboutSectionQuestion question="Qui peut devenir membre ?">
        Tous les apprenants du CESI Nancy peuvent devenir membre de l’association, <u>gratuitement et sans
        engagement</u> !
    </AboutSectionQuestion>
    <div class="img-container">
        <img alt="Page de personnalisation de compte" src="/illustrations/members-settings.svg"/>
    </div>
    <AboutSectionQuestion question="Quels sont les avantages ?" right>
        Vous pourrez avoir des réductions à l’épicerie, participer aux évènements de l’association, participer aux
        activités de clubs et même en créer un !
    </AboutSectionQuestion>
    <AboutSectionQuestion question="Comment devenir membre ?">
        Vous avez juste à cliquer sur le bouton ci-dessous et à vous connecter avec votre <u>compte Microsoft
        Viacesi</u>. Aucun accès / information ne sera obtenu avec cette connexion, à part votre identité et votre
        email.
    </AboutSectionQuestion>

    <div slot="cta" class="cta">
        <MicrosoftLoginButton/>
    </div>
</SectionContainer>
