<script>
    export let dark = false;
    export let header = false;
</script>


<style>
    section {
        min-height: calc(100vh - 8rem);
        background: var(--white);
        padding: 6rem 16rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .dark {
        background: var(--black);
        color: var(--white);
    }

    .header {
        min-height: 100vh;
        padding-top: calc(var(--nav-height) + 6rem);
    }

    div {
        max-width: 90rem;
        width: 100%;
    }

    @media all and (max-width: 1700px) {
        section {
            padding: 4rem 8rem;
        }

        section.header {
            padding-top: calc(var(--nav-height) + 4rem);
        }
    }

    @media all and (max-width: 1350px) {
        section {
            padding: 2rem 4rem;
        }

        section.header {
            padding-top: calc(var(--nav-height) + 2rem);
        }
    }

    @media all and (max-width: 1000px) {
        section {
            padding: 1rem 2rem;
        }

        section.header {
            padding-top: calc(var(--nav-height) + 1rem);
        }
    }

    @media all and (max-width: 850px) {
        section.header {
            padding: 1rem 2rem calc(var(--nav-height) + 1rem);
        }
    }
</style>


<section class:dark class:header>
    <div>
        <slot/>
    </div>
</section>
