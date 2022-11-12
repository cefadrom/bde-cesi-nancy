<script lang="ts">
    import AboutSection from '$lib/home/AboutSection.svelte';
    import OrganizationChartSection from '$lib/home/OrganizationChartSection.svelte';
    import Recruitment from '$lib/home/Recruitment.svelte';
    import SponsorsSection from '$lib/home/SponsorsSection.svelte';
    import WelcomeSection from '$lib/home/WelcomeSection.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { Recruitment as RecruitmentPosts } from '@bde-cesi-nancy/types';

    export let data: { recruitment: RecruitmentPosts[] };
</script>


<Meta title="Accueil"/>


<WelcomeSection/>
<AboutSection/>
<SponsorsSection/>
{#if data.recruitment?.length}
    <Recruitment posts={data.recruitment}/>
{/if}
<OrganizationChartSection gray={data.recruitment?.length > 0}/>
