<script lang="ts">
    export let label: string;
    export let href: string;
    export let current: boolean = false;
</script>


<style>
    a, a:link, a:visited {
        color: var(--black);
        text-decoration: none;
        padding: 1em;
    }

    span {
        display: inline-block;
        position: relative;
        height: 24px;
        line-height: 24px;
    }

    span::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -8px;
        width: 0;
        height: 3px;
        border-radius: 3px;
        background-color: var(--black);
        transition: width 0.2s ease-in-out;
    }

    a.current span::after, a:hover span::after {
        width: 100%;
    }
</style>


<a class="bold" class:current {href}>
    <span>{label}</span>
</a>
