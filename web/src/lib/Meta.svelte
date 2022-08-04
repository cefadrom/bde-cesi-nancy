<script lang="ts">
    import { page } from '$app/stores';

    export let title;
    export let description = 'Le site web officiel du BDE de CESI Nancy';
    export let nomarker = false;
    export let noindex = false;
    export let image = 'opengraph.png';

    let displayTitle: string;
    $: displayTitle = `${title || defaultTitle}${title && !nomarker ? ' - BDE CESI Nancy' : ''}`;

    let displayDescription;
    $: displayDescription = description.replace(/\n/g, ' ');

    const defaultTitle = 'BDE CESI Nancy';
</script>


<svelte:head>
    <!-- Primary Meta Tags -->
    <title>{displayTitle}</title>
    <meta content={displayTitle} name="title">
    <meta content={displayDescription} name="description">

    <!-- Open Graph / Facebook -->
    <meta content="website" property="og:type">
    <meta content="https://bdecesinancy.fr{$page.url.pathname}" property="og:url">
    <meta content={displayTitle} property="og:title">
    <meta content={displayDescription} property="og:description">
    <meta content={image} property="og:image">
    <meta content="BDE CESI Nancy" property="og:site_name">

    <!-- Twitter -->
    <meta content="summary_large_image" property="twitter:card">

    <!-- Search engines -->
    {#if noindex}
        <meta name="robots" content="noindex"/>
    {/if}
</svelte:head>
