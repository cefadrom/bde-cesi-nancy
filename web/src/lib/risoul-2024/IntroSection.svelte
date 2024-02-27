<style>
    section {
        min-height: 100vh;
    }

    .bg-image {
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        z-index: 1;
        mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, .1) 90%, rgba(0, 0, 0, 0) 100%);
    }

    .information {
        position: absolute;
        z-index: 2;
        text-shadow: rgba(0, 0, 0, .2) 0 0 .5rem;
        padding: 2rem;
        left: 0;
        bottom: 0;
    }

    @media all and (max-width: 850px) {
        .bg-image {
            mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, .2) 70%, rgba(0, 0, 0, 0) 100%);
        }

        .information {
            bottom: var(--nav-height);
        }
    }

    h1 {
        margin-bottom: 0;
    }
</style>

<section>
    <img class="bg-image" src="/risoul-2024/ski-et-snow.webp" alt="Ski et Snow">

    <div class="information">
        <h1 class="header-1">Weekend ski dans les Alpes</h1>
        <h3 class="header-3">21/03 au 24/03 - Risoul</h3>
    </div>
</section>
