<script lang="ts">
    import SectionContainer from "$lib/layout/SectionContainer.svelte";
    import SkiInformation from "$lib/risoul-2024/SkiInformation.svelte";
</script>

<style>
    .info-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    @media all and (max-width: 1000px) {
        .info-container {
            grid-template-columns: 1fr;
            justify-items: center;
        }
    }

    @media all and (max-width: 500px) {
        .info-container {
            gap: 1rem;
        }
    }

    p {
        margin-bottom: .2rem;
    }

    ul {
        list-style: disc;
        padding-left: 1.5rem;
        margin-top: .2rem;
        margin-bottom: 0;
    }
</style>

<SectionContainer>
    <h1 class="header-1">Informations pratiques</h1>

    <div class="info-container">
        <SkiInformation title="Tarifs">
            <p class="body">Forfait de 305€/personne, comprend :</p>
            <ul>
                <li>Le trajet en bus aller et retour</li>
                <li>L’hébergement</li>
                <li>Le forfait de remontée mécanique</li>
                <li>Le matériel de ski ou snow</li>
            </ul>
        </SkiInformation>

        <SkiInformation title="Dates">
            <p class="body">
                Aller : départ du CESI Nancy le jeudi 21 mars à 21h00 et arrivée à la station de Risoul le vendredi
                22 mars vers 8-9h00
            </p>

            <p class="body">
                Retour : départ de la station de Risoul le dimanche 24 mars à 18h00 et arrivée au CESI Nancy le lundi
                25 mars vers 5-6h00
            </p>
        </SkiInformation>

        <SkiInformation title="Assurance">
            <p class="body">Vous pouvez choisir de prendre une assurance :</p>
            <ul>
                <li>Annulation</li>
                <li>Rapatriement</li>
                <li>Annulation et rapatriement</li>
            </ul>
        </SkiInformation>

        <SkiInformation title="Logement">
            <p class="body">
                Les participants sont logés dans des appartements faisant partie de la résidence étudiante Les
                Mélèzes à Risoul. Ce sont des petits appartements fonctionnels de 4 à 6 personnes au choix, situés aux
                pieds des pistes. La gestion des appartements se fait directement sur le site.
            </p>
        </SkiInformation>

        <SkiInformation title="Option skis">
            <p class="body">
                Si vous possédez déjà votre propre matériel, vous n’êtes pas obligé de prendre l’option MATÉRIEL DE SKI
                (cette option sera alors déduite de votre forfait).
            </p>
        </SkiInformation>

        <SkiInformation title="Option draps">
            <p class="body">
                Si vous ne souhaitez pas prendre vos propres draps, une option vous est proposée. Dans le cas contraire,
                il est INDISPENSABLE de vous en procurer !
            </p>
        </SkiInformation>
    </div>
</SectionContainer>
