<script>
    import HeaderLink from './HeaderLink.svelte';
</script>

<style>
    header {
        position: fixed;
        inset: 0;
        width: 100%;
        height: min-content;
        background-color: rgb(250, 251, 255, .6);
        backdrop-filter: blur(64px);
        box-shadow: var(--nav-shadow);
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        padding: 2rem;
    }

    img {
        height: 60px;
        width: 60px;
    }

    .nav-members, nav {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    nav {
        gap: 2em;
    }

    .nav-members {
        justify-content: end;
    }
</style>


<header>
    <div>
        <a href="/">
            <img alt="Logo BDE CESI Nancy" src="brand/detailed.svg">
        </a>
    </div>
    <nav>
        <HeaderLink href="/" icon="home-filled-black" label="Accueil"/>
        <HeaderLink href="/sponsors" icon="diamond-filled-black" label="Sponsors"/>
        <HeaderLink href="/events" icon="bonfire-filled-black" label="Événements"/>
        <HeaderLink href="/clubs" icon="people-filled-black" label="Clubs"/>
        <HeaderLink href="/contact" icon="mail-filled-black" label="Contact"/>
    </nav>
    <div class="nav-members">
        <HeaderLink href="/members" icon="person-filled-black" label="Espace Membre"/>
    </div>
</header>
