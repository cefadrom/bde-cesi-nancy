<script lang="ts">
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import ChartPerson from '@bde-cesi-nancy/components/src/OrganizationChart/ChartPerson.svelte';
    import ChartSection from '@bde-cesi-nancy/components/src/OrganizationChart/ChartSection.svelte';
</script>


<style>
    h2 {
        margin: 0 0 6rem;
    }

    .chart-container {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .chart {
        display: grid;
        grid-template-columns: repeat(3, 25rem);
        grid-template-rows: repeat(3, min-content);
        gap: 2rem;
    }

    @media all and (max-width: 1350px) {
        h2 {
            margin-bottom: 3rem;
        }

        .chart {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            width: 100%;
        }
    }
</style>


<SectionContainer>
    <h2 class="header-2">Organigramme du <span class="no-br">BDE 🌐</span></h2>

    <div class="chart-container">
        <div class="chart">
            <ChartSection area="1 / 2 / 2 / 3" title="Bureau">
                <ChartPerson name="Lukas Houille" role="Président"/>
                <ChartPerson name="Antoine Faure" role="Vice-président"/>
                <ChartPerson name="Lucas Hauswirth" role="Trésorier"/>
                <ChartPerson name="Matthis Pinheiro-cruz" role="Secrétaire"/>
            </ChartSection>

            <ChartSection area="2 / 2 / 3 / 3" title="Pôle cafet'">
                <ChartPerson name="Julien Rousseau" role="Cassiopée"/>
                <ChartPerson name="Siham Bouchaal" role="Orion"/>
                <ChartPerson name="Théo Urbanc" role="Aide"/>
            </ChartSection>

            <ChartSection area="3 / 1 / 4 / 2" title="Pôle sport">
                <ChartPerson name="Théo Carneiro" role="Sport régulier"/>
                <ChartPerson name="Hugo Kroneberg" role="Event’ sportif"/>
            </ChartSection>

            <ChartSection area="3 / 2 / 4 / 3" title="Pôle comm'">
                <ChartPerson name="Tom Ingargiola" role="Clubs et comm’"/>
                <ChartPerson name="Lucas Bauer" role="Réseaux"/>
                <ChartPerson name="Maxime Sahyoun" role="Affiches"/>
                <ChartPerson name="Raphaël Denni" role="Discord"/>
                <ChartPerson name="Julien Wolff" role="Site Web"/>
                <ChartPerson name="Thomas Czerniak" role="Merch"/>
                <ChartPerson name="Gabriel Anciaux" role="Aide"/>
                <ChartPerson name="Maxime Meyer" role="Aide"/>
            </ChartSection>

            <ChartSection area="3 / 3 / 4 / 4" title="Pôle event'">
                <ChartPerson name="Lucille Gille" role="Organisation event’"/>
                <ChartPerson name="Virgile Nicolas" role="Vérification event'"/>
            </ChartSection>
        </div>
    </div>

</SectionContainer>
