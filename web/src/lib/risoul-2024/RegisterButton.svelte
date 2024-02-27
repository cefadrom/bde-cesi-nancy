<script lang="ts">
    export let padding = false;

    const LINK = 'https://groupes.odyc.fr/grouptravel/registration/welcome.aspx?reqGuid=549EDD00-F1B3-42B4-BB90-4784F1FF95F0';
</script>


<style>
    .btn-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .padding {
        padding: 2rem 0;
    }

    button {
        border: none;
        outline: none;
        padding: 1.5rem 3rem;
        border-radius: 2rem;
        cursor: pointer;
        transition: box-shadow .2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.625rem;
        background-color: var(--primary);
        color: var(--white);
        font-size: 2rem;
        font-weight: 700;
        animation: bounce 1s infinite ease-in-out;
    }

    @media all and (max-width: 500px) {
        button {
            font-size: 1.5rem;
            padding: 1rem 2rem;
            border-radius: 1.5rem;
        }
    }

    a {
        text-decoration: none;
    }

    @keyframes bounce {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
</style>


<div class="btn-container" class:padding>
    <a href={LINK}>
        <button>INSCRIVEZ-VOUS !!</button>
    </a>
</div>
