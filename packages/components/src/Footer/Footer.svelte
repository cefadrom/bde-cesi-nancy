<style>
    footer {
        color: var(--white);
    }

    .footer-content {
        background-color: var(--black);
        padding: 2rem 4rem;
        display: flex;
        align-items: center;
    }

    .footer-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }

    .footer-link-section p {
        color: var(--gray);
        margin: 0 0 .75rem;
    }

    .footer-links {
        display: flex;
        gap: 4rem;
    }

    .footer-link-section {
        display: flex;
        flex-direction: column;
    }

    .footer-cols {
        display: flex;
        gap: 1rem;
    }

    .footer-socials {
        display: flex;
        gap: 2rem;
    }

    .footer-copyright {
        background-color: var(--light-dark);
    }

    a, a:link, a:visited {
        color: inherit;
        text-decoration: none;
    }
</style>


<footer>
    <div class="footer-content">
        <a href="/">
            <img src="/brand/professional-dark.svg" alt="BDE CESI Nancy"/>
        </a>
        <div class="footer-info">
            <div class="footer-links">
                <div class="footer-link-section">
                    <h4 class="bold">Coordonnées</h4>
                    <p class="small">3 Rue de la Champelle<br/>54500 Vandoeuvre-lès-Nancy</p>
                    <p class="small"><a href="mailto:contact@bdecesinancy.fr">contact@bdecesinancy.fr</a></p>
                </div>
                <div class="footer-link-section">
                    <h4 class="bold">Navigation</h4>
                    <div class="footer-cols">
                        <div>
                            <p class="small"><a href="/">Accueil</a></p>
                            <p class="small"><a href="/clubs">Clubs</a></p>
                            <p class="small"><a href="/shop">Shop</a></p>
                        </div>
                        <div>
                            <p class="small"><a href="/contact">Contact</a></p>
                            <p class="small"><a href="/members">Membre</a></p>
                        </div>
                    </div>
                </div>
                <div class="footer-link-section">
                    <h4 class="bold">Infos</h4>
                    <div class="footer-cols">
                        <p class="small"><a href="/predecessors">Anciens BDE</a></p>
                        <p class="small"><a href="/sponsors">Sponsors</a></p>
                    </div>
                    <p class="small"><a href="/development">Contribuer au développement</a></p>
                    <p class="small"><a href="/bug-bounty">Bug bounty</a></p>
                </div>
            </div>
            <div class="footer-socials">
                <a href="https://www.instagram.com/bde_cesi_nancy" rel="noreferrer noopener">
                    <img src="/icons/instagram.svg" alt="Instagram" loading="lazy" height="48" width="48"/>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100082834512925" rel="noreferrer noopener">
                    <img src="/icons/facebook.svg" alt="Facebook" loading="lazy" height="48" width="48"/>
                </a>
                <a href="https://twitter.com/BdeCesi" rel="noreferrer noopener">
                    <img src="/icons/twitter.svg" alt="Twitter" loading="lazy" height="48" width="48"/>
                </a>
                <a href="https://discord.gg/2D6JK72HWS" rel="noreferrer noopener">
                    <img src="/icons/discord.svg" alt="Discord" loading="lazy" height="48" width="48"/>
                </a>
                <a href="https://www.linkedin.com/company/86757985/" rel="noreferrer noopener">
                    <img src="/icons/linkedin.svg" alt="LinkedIn" loading="lazy" height="48" width="48"/>
                </a>
            </div>
        </div>
    </div>
    <div class="footer-copyright">
        Copyright &copy; 2022 - 2023 tous les droits réservés.
    </div>
</footer>
