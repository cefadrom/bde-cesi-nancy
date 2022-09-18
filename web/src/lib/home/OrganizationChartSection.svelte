<script lang="ts">
    import SectionContainer from '$lib/layout/SectionContainer.svelte';
</script>


<style>
    h2 {
        margin: 0 0 6rem;
    }

    .mobile {
        visibility: hidden;
        display: none;
    }

    .mobile img {
        max-width: 25rem;
    }

    @media all and (max-width: 1350px) {
        h2 {
            margin-bottom: 3rem;
        }
    }

    @media all and (max-width: 850px) {
        .desktop {
            visibility: hidden;
            display: none;
        }

        .mobile {
            visibility: visible;
            display: flex;
            width: 100%;
            justify-content: center;
        }
    }
</style>


<SectionContainer>
    <h2 class="header-2">Organigramme du <span class="no-br">BDE 🌐</span></h2>
    <img class="desktop" src="/organization/chart-desktop.svg" alt="Organigramme du BDE" loading="lazy">
    <div class="mobile">
        <img src="/organization/chart-mobile.svg" alt="Organigramme du BDE" loading="lazy">
    </div>
</SectionContainer>
