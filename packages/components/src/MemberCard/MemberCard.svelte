<script lang="ts">
    import type { Promotion, User } from '@bde-cesi-nancy/types';
    import { onMount } from 'svelte';

    export let user: User<Promotion>;
    export let black = false;

    let showBack = false;

    function reverseCard() {
        showBack = !showBack;
        navigator.vibrate(100);
    }

    let cardContainer: HTMLDivElement;
    let QRCodeContainer: HTMLElement;

    onMount(async () => {
        const { default: QRCodeStyling } = await import('qr-code-styling');

        const QRCode = new QRCodeStyling({
            width: 128,
            height: 128,
            data: user.id,
            type: 'svg',
            dotsOptions: {
                type: 'rounded',
                color: black ? 'var(--white)' : 'var(--black)',
            },
            backgroundOptions: {
                color: 'transparent',
            },
        });

        QRCode.append(QRCodeContainer);
    });

    onMount(handleCardResize);

    const MAX_CARD_WIDTH_REM = 28;
    const MAX_CARD_HEIGHT_REM = 17.25;
    const pxToRem = (px: number) => px / parseFloat(getComputedStyle(document.documentElement).fontSize);

    let cardScale = 1;
    let cardMarginBottom = 0;

    function handleCardResize() {
        const parentWidth = pxToRem(cardContainer.parentElement.clientWidth);
        cardScale = Math.min(1, parentWidth / MAX_CARD_WIDTH_REM);
        cardMarginBottom = -MAX_CARD_HEIGHT_REM * (1 - cardScale);
    }
</script>


<svelte:window on:resize={handleCardResize}/>


<style>
    .card {
        width: 28rem;
        height: 17.25rem;
        border-radius: .75rem;
        position: relative;
        --perspective: 64rem;
        user-select: none;
        transform-origin: top left;
    }

    .card-front, .card-back {
        border-radius: .75rem;
        background: linear-gradient(150deg, #ffd901, #fdbd21);
        box-shadow: 1px 1px var(--dark-gray), 1px 1px 5px var(--dark-gray);
        position: absolute;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        transition: transform .75s ease;
    }

    .card.black .card-front, .card.black .card-back {
        background: linear-gradient(150deg, #1f2333, #191c29);
        color: var(--white);
        transform-origin: initial;
    }

    .card-front {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 2rem;
        gap: 2rem;
        transform: rotateY(0) perspective(var(--perspective));
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }

    .card-header img {
        width: 3rem;
        height: 3rem;
    }

    .card-header h3 {
        margin: 0;
    }

    .card-identity {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
    }

    .card-user {
        display: flex;
        align-items: start;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        min-width: 0; /* https://stackoverflow.com/a/66689926 */
    }

    .card-user span {
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        display: block;
        max-width: 100%;
    }

    .card-qrcode {
        scale: 1.2;
        height: 128px;
        width: 128px;
    }

    .card-back {
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotateY(-180deg) perspective(var(--perspective));
    }

    .card-back img {
        max-width: 100%;
        max-height: 100%;
    }

    .card.show-back .card-front {
        transform: rotateY(180deg) perspective(var(--perspective));
    }

    .card.show-back .card-back {
        transform: rotateY(0) perspective(var(--perspective));
    }
</style>


<div bind:this={cardContainer}
     class="card"
     class:black
     class:show-back={showBack}
     on:click={reverseCard}
     style:margin-bottom="{cardMarginBottom}rem"
     style:transform="scale({cardScale})">
    <div class="card-front">
        <div class="card-header">
            <img src="/brand/simple.svg" alt="BDE CESI Nancy" draggable="false"/>
            {#if black}
                <h3 class="header-3">Carte Black cotisant</h3>
            {:else}
                <h3 class="header-3">Carte Gold adhérent</h3>
            {/if}
        </div>
        <div class="card-identity">
            <div class="card-user">
                <span>{user.last_name} {user.first_name}</span>
                <span>{user.promotion?.name || user.promotion?.code || user.promotion || '-'}</span>
                <span>{user.email}</span>
            </div>
            <div class="card-qrcode" bind:this={QRCodeContainer}/>
        </div>
    </div>
    <div class="card-back">
        <img src={black ? "/brand/professional-dark.svg" : "/brand/professional.svg"}
             draggable="false"
             alt="Bureau des élèves CESI Nancy">
    </div>
</div>
