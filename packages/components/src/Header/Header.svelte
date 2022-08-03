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
    <img alt="Logo BDE CESI Nancy" src="brand/detailed.svg">
    <nav>
        <HeaderLink href="/" label="Accueil">Accueil</HeaderLink>
        <HeaderLink href="/sponsors" label="Sponsors">Membres</HeaderLink>
        <HeaderLink href="/events" label="Événements">Événements</HeaderLink>
        <HeaderLink href="/clubs" label="Clubs">Contact</HeaderLink>
        <HeaderLink href="/contact" label="Contact">Contact</HeaderLink>
    </nav>
    <div class="nav-members">
        <HeaderLink href="/members" label="Espace Membre"/>
    </div>
</header>
