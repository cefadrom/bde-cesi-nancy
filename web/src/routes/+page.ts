import { env } from '$env/dynamic/public';
import type { OrganizationChart, Recruitment } from '@bde-cesi-nancy/types';
import type { PageLoad } from './$types';

type RawRecruitmentData = { data?: Recruitment[] };
type RawOrganisationChartData = { data?: OrganizationChart[] };

export const load: PageLoad = async ({ fetch }) => {
    try {
        const [ recruitmentRes, organizationRes ] = await Promise.all([
            fetch(`${env.PUBLIC_DIRECTUS_URL}/items/recruitment`),
            fetch(`${env.PUBLIC_DIRECTUS_URL}/items/organization_chart`),
        ]);
        const [ recruitment, organizationChart ] = await Promise.all([
            recruitmentRes.json() as RawRecruitmentData,
            organizationRes.json() as RawOrganisationChartData,
        ]);
        return {
            recruitment: recruitment.data || [],
            organizationChart: organizationChart.data || [],
        };
    } catch (e) {
        console.error(e);
        return { recruitment: [], organizationChart: [] };
    }
};
