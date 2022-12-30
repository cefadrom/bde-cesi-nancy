<script lang="ts">
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import ChartSection from '@bde-cesi-nancy/components/src/OrganizationChart/ChartSection.svelte';
    import type { OrganizationChart } from '@bde-cesi-nancy/types';

    export let gray = false;
    export let chart: OrganizationChart[];
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


<SectionContainer {gray}>
    <h2 class="header-2">Organigramme du <span class="no-br">BDE 🌐</span></h2>

    <div class="chart-container">
        <div class="chart">
            <ChartSection area="1 / 2 / 2 / 3" title="Bureau"
                          persons={chart.filter(person => person.pole === 'bureau')}/>

            <ChartSection area="2 / 2 / 3 / 3" title="Pôle cafet'"
                          persons={chart.filter(person => person.pole === 'cafet')}/>

            <ChartSection area="3 / 2 / 4 / 3" title="Pôle comm'"
                          persons={chart.filter(person => person.pole === 'communication')}/>

            <ChartSection area="3 / 3 / 4 / 4" title="Pôle event'"
                          persons={chart.filter(person => person.pole === 'event')}/>
        </div>
    </div>

</SectionContainer>
