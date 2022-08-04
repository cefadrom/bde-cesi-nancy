<script>
    export let dark = false;
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

    div {
        max-width: 90rem;
        width: 100%;
    }

    @media all and (max-width: 1700px) {
        section {
            padding: 4rem 8rem;
        }
    }

    @media all and (max-width: 1350px) {
        section {
            padding: 2rem 4rem;
        }
    }

    @media all and (max-width: 1000px) {
        section {
            padding: 1rem 2rem;
        }
    }
</style>


<section class:dark>
    <div>
        <slot/>
    </div>
</section>
