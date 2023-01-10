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
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
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
            <ChartSection title="Bureau" persons={chart} pole="bureau"/>
            <ChartSection title="Pôle comm'" persons={chart} pole="communication"/>
            <ChartSection title="Pôle cafet'" persons={chart} pole="cafet"/>
            <ChartSection title="Pôle event'" persons={chart} pole="event"/>
        </div>
    </div>

</SectionContainer>
