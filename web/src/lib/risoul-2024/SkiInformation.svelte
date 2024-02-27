<script lang="ts">
    export let title: string;
</script>

<style>
    .info {
        padding: 1rem;
        border: 1px solid var(--primary);
        border-radius: 1rem;
    }

    .header-3 {
        margin-top: 0;
        margin-bottom: 0;
    }

    @media all and (max-width: 1000px) {
        .info {
            max-width: 30rem;
            width: 100%;
        }
    }
</style>

<div class="info">
    <h3 class="header-3">{title}</h3>
    <slot/>
</div>
