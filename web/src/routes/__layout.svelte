<script>
    import '$lib/global.css';
    import Header from '@bde-cesi-nancy/components/src/Header/Header.svelte';
</script>


<style>
    main {
        min-height: 100vh;
    }
</style>


<Header/>
<main>
    <slot/>
</main>
