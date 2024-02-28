<script lang="ts">
    import SectionContainer from "$lib/layout/SectionContainer.svelte";
    import { onDestroy, onMount } from "svelte";
    import type { Swiper } from 'swiper/types';

    let carrouselLoading = true;
    let carrousel: Swiper | null = null;
    let observer: IntersectionObserver | null = null


    onMount(async () => {
        const swiper = await import('./swiper');
        carrousel = swiper.createSwiperInstance('.image-carrousel', {
            rewind: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
        carrouselLoading = false;

        observer = new IntersectionObserver((ev) => {
            if (!ev[0]?.isIntersecting)
                carrousel!.autoplay.pause();
            else
                carrousel!.autoplay.start();
        });
        observer.observe(carrousel.el);
    });

    onDestroy(() => {
        carrousel?.destroy();
        observer?.disconnect();
    });
</script>

<style>
    .image-carrousel {
        width: 100%;
        height: 70vh;
    }

    .swiper-slide {
        object-fit: contain;
        height: 100%;
        width: 100%;
    }

    .carrouselLoading {
        width: 10rem;
    }

    .swiper {
        --swiper-theme-color: var(--primary) !important;
    }
</style>

<SectionContainer>
    <div class="swiper image-carrousel">
        <div class="swiper-wrapper">
            <img alt="Ski"
                 class="swiper-slide"
                 class:carrouselLoading
                 loading="lazy"
                 src="/risoul-2024/ski.webp"/>
            <img alt="Concert en extérieur"
                 class="swiper-slide"
                 class:carrouselLoading loading="lazy"
                 src="/risoul-2024/concert-exterieur.webp"/>
            <img alt="Homme devant une foule"
                 class="swiper-slide"
                 class:carrouselLoading loading="lazy"
                 src="/risoul-2024/homme-totally.webp"/>
            <img alt="Jeunes et canettes"
                 class="swiper-slide"
                 class:carrouselLoading loading="lazy"
                 src="/risoul-2024/jeunes-et-canettes.webp"/>
            <img alt="Jeunes posés dans la neige"
                 class="swiper-slide"
                 class:carrouselLoading loading="lazy"
                 src="/risoul-2024/jeunes-posés-dans-la-neige.webp"/>
            <img alt="Ski et Snow"
                 class="swiper-slide"
                 class:carrouselLoading loading="lazy"
                 src="/risoul-2024/ski-et-snow.webp"/>
            <img alt="Snowboard"
                 class="swiper-slide"
                 class:carrouselLoading loading="lazy"
                 src="/risoul-2024/snow.webp"/>
            <img alt="Télésiège"
                 class="swiper-slide"
                 class:carrouselLoading loading="lazy"
                 src="/risoul-2024/telesiege.webp"/>
        </div>
        <div class="swiper-button-next"/>
        <div class="swiper-button-prev"/>
        <div class="swiper-pagination"/>
    </div>
</SectionContainer>
