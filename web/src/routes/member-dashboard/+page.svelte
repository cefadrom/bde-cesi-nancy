<script lang="ts">
    import LoggedInContainer from '$lib/layout/LoggedInContainer.svelte';
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
    import Meta from '$lib/Meta.svelte';
    import type { User } from '@bde-cesi-nancy/types';
    import { getContext } from 'svelte';

    const me = getContext<User>('me');
</script>


<Meta title="Espace membre" noindex/>


<LoggedInContainer header>
    <SectionContainer header>
        <h1 class="header-1">Bonjour {$me.first_name} 👋</h1>
    </SectionContainer>
</LoggedInContainer>
