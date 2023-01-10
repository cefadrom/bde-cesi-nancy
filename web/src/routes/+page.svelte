<script lang="ts">
    import AboutSection from '$lib/home/AboutSection.svelte';
    import OrganizationChartSection from '$lib/home/OrganizationChartSection.svelte';
    import Recruitment from '$lib/home/Recruitment.svelte';
    import SponsorsSection from '$lib/home/SponsorsSection.svelte';
    import WelcomeSection from '$lib/home/WelcomeSection.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>


<Meta title="Accueil"/>


<WelcomeSection/>
<AboutSection/>
<SponsorsSection/>
{#if data.recruitment?.length}
    <Recruitment posts={data.recruitment}/>
{/if}
{#if data.organizationChart?.length}
    <OrganizationChartSection gray={data.recruitment?.length > 0} chart={data.organizationChart}/>
{/if}
