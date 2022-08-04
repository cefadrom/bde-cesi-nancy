<style>
    img {
        height: 100vh;
        width: 100%;
        object-fit: cover;
        object-position: 15% 90%;
    }

    h1 {
        position: absolute;
        left: 2rem;
        bottom: 2rem;
        color: var(--white);
        max-width: 11em;
        margin-right: 2em;
    }
</style>


<section>
    <picture>
        <source media="(min-width: 1920px) or (min-height: 1080px)" srcset="students/students-1440.jpg">
        <source media="(min-width: 1080px) or (min-height: 720px)" srcset="students/students-1920.jpg">
        <source media="(max-width: 1080px) and (max-height: 720px)" srcset="students/students-720.jpg">
        <img alt="Étudiants" src="students/students-1920.jpg">
    </picture>

    <h1 class="header-1">Bienvenue sur le site du BDE du CESI Nancy</h1>
</section>
