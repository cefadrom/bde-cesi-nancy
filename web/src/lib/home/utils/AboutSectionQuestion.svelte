<script lang="ts">
    export let question: string;
    export let right = false;
</script>


<style>
    .section {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .section:not(:last-of-type) {
        margin-bottom: 8rem;
    }

    .right {
        align-items: end;
    }

    h3 {
        margin-top: 0;
    }

    p {
        max-width: 25rem;
    }

    @media all and (max-width: 900px) {
        .section:not(:last-of-type) {
            margin-bottom: 2rem;
        }

        p {
            max-width: none;
        }
    }
</style>


<div class="section" class:right>
    <div>
        <h3 class="header-3">{question}</h3>
        <p class="body">
            <slot/>
        </p>
    </div>
</div>
