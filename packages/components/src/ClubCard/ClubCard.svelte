<script lang="ts">
    import type { Club } from '@bde-cesi-nancy/types';

    export let club: Club;
</script>


<style>
    .card {
        display: flex;
        background-color: var(--white);
        border-radius: .75rem;
        align-items: center;
        justify-content: start;
        height: auto;
        width: 40rem;
        max-width: 100%;
        min-height: 0;
        aspect-ratio: 8 / 3;
    }

    img {
        aspect-ratio: 1 / 1;
        border-radius: .75rem 0 0 .75rem;
        height: 100%;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: start;
        padding: 1rem;
        width: 100%;
        height: 100%;
    }

    a {
        text-decoration: none;
        color: var(--blue);
    }

    h3, p {
        margin: 0;
    }

    @media all and (max-width: 600px) {
        .card {
            aspect-ratio: 10 / 3;
        }

        .content {
            padding: .5rem;
        }
    }

    @media all and (max-width: 500px) {
        .card {
            aspect-ratio: unset;
        }

        img {
            display: none;
        }

        .content {
            gap: .5rem;
        }
    }
</style>


<div class="card">
    <img src={club.thumbnail} alt={club.name} loading="lazy"/>
    <div class="content">
        <h3 class="header-3">{club.name}</h3>
        <p class="body">{club.description}</p>
        <p class="small">
            Président : {club.president_name}
            <br/>
            Contact : <a href="mailto:{club.contact_email}">{club.contact_email}</a>
        </p>
    </div>
</div>
