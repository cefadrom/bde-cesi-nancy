<script lang="ts">
    export let title: string;
    export let area: string;
</script>


<style>
    .wrapper {
        width: 25rem;
        max-width: 100%;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        width: 100%;
        gap: 1rem;
        border: 1px solid var(--primary);
        border-radius: 1rem;
    }

    h3 {
        margin: 0;
        width: 100%;
        text-align: center;
    }

    .container div {
        display: grid;
        grid-template-columns: 1fr max-content;
        width: 100%;
        gap: .5rem;
    }
</style>


<div class="wrapper" style:grid-area={area}>
    <div class="container">
        <h3 class="header-3">{title}</h3>
        <div class="body">
            <slot/>
        </div>
    </div>
</div>
