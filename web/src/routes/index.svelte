<style>
    img {
        height: 100vh;
        width: 100vw;
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


<picture>
    <source srcset="students/students-1440.jpg" media="(min-width: 1920px) or (min-height: 1080px)">
    <source srcset="students/students-1920.jpg" media="(min-width: 1080px) or (min-height: 720px)">
    <source srcset="students/students-720.jpg" media="(max-width: 1080px) and (max-height: 720px)">
    <img src="students/students-1920.jpg" alt="Étudiants">
</picture>

<h1 class="header-1">Bienvenue sur le site du BDE du CESI Nancy</h1>
