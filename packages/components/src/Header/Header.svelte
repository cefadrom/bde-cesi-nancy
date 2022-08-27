<script>
    import HeaderLink from './HeaderLink.svelte';
</script>

<style>
    header {
        position: fixed;
        inset: 0;
        width: 100%;
        height: var(--nav-height);
        background-color: rgb(250, 251, 255, .6);
        backdrop-filter: blur(64px);
        box-shadow: var(--nav-shadow);
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        padding: 2rem;
        z-index: 10;
    }

    img, a {
        height: 4rem;
        width: 4rem;
        display: block;
    }

    .nav-members, nav {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    nav {
        gap: 2rem;
    }

    .members-link {
        display: none;
    }

    .nav-members {
        justify-content: end;
    }

    @media all and (max-height: 900px) {
        header {
            height: var(--nav-height);
            padding: 0;
        }

        .nav-logo {
            padding: .5rem 1rem;
        }

        img, a {
            height: 3rem;
            width: 3rem;
        }
    }

    @media all and (max-width: 1400px) {
        header {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .nav-logo {
            display: none;
        }

        .members-link {
            display: unset;
        }

        .nav-members {
            display: none;
        }
    }

    @media all and (max-width: 1000px) {
        .sponsors-link {
            display: none;
        }
    }

    /* Mobile nav bar (bottom) */
    @media all and (max-width: 850px) {
        header {
            height: var(--nav-height);
            bottom: 0;
            top: unset;
            padding: 0;
        }

        nav {
            gap: 0;
            width: 100%;
        }

        .members-link {
            display: flex;
            flex: 1;
        }
    }
</style>


<header>
    <div class="nav-logo">
        <a href="/">
            <img alt="Logo BDE CESI Nancy" src="brand/detailed.svg">
        </a>
    </div>
    <nav>
        <HeaderLink href="/" icon="home-filled-black" label="Accueil"/>
        <div class="sponsors-link">
            <HeaderLink href="/sponsors" icon="diamond-filled-black" label="Sponsors"/>
        </div>
        <HeaderLink href="/events" icon="bonfire-filled-black" label="Événements"/>
        <HeaderLink href="/clubs" icon="people-filled-black" label="Clubs"/>
        <HeaderLink href="/contact" icon="mail-filled-black" label="Contact"/>
        <div class="members-link">
            <HeaderLink href="/members" icon="person-filled-black" label="Membre"/>
        </div>
    </nav>
    <div class="nav-members">
        <HeaderLink href="/members" icon="person-filled-black" label="Espace Membre"/>
    </div>
</header>
