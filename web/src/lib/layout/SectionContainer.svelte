<script>
    export let gray = false;
    export let header = false;
    export let hidecta = false;
</script>


<style>
    section {
        min-height: calc(100vh - var(--nav-height));
        background: var(--white);
        padding: 6rem 16rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .gray {
        background: var(--lighter-gray);
    }

    .header {
        min-height: 100vh;
        padding-top: calc(var(--nav-height) + 6rem);
    }

    .container {
        max-width: 90rem;
        width: 100%;
    }

    .cta {
        width: 100%;
        margin-top: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
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

        .cta {
            margin-top: 2rem;
        }
    }

    @media all and (max-width: 850px) {
        section.header {
            padding: 1rem 2rem calc(var(--nav-height) + 1rem);
        }
    }
</style>


<section class:gray class:header>
    <div class="container">
        <slot/>
        {#if $$slots.cta && !hidecta}
            <span class="cta">
                <slot name="cta"/>
            </span>
        {/if}
    </div>
</section>
