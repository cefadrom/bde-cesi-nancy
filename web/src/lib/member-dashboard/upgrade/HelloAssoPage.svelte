<script lang="ts">
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import LoadingSpinner from '@bde-cesi-nancy/components/src/LoadingSpinner/LoadingSpinner.svelte';
    import Popup from '@bde-cesi-nancy/components/src/Popup/Popup.svelte';
    import { getContext } from 'svelte';
    import type { Directus } from '$lib/types';
    import { goto } from '$app/navigation';
    import type { Promotion, User } from '@bde-cesi-nancy/types';
    import { getUserProfile } from '$lib/api/getUserProfile';

    export let type: 'adhesion' | 'cotisation';

    const directus = getContext<Directus>('directus');
    const me = getContext<User<Promotion>>('me');

    let loaded = false;
    let showCancelPopup = false;
    let showValidationPopup = false;
    let firstTimeCheckingMembership = true;
    let validationState: 'loading' | 'success' | 'error' = 'loading';

    const setCancelPopup = (state: boolean) => () => {
        showCancelPopup = state;
    };

    function goToDashboard() {
        goto('/member-dashboard');
    }

    const hasMembershipUpgraded = (membership: string) =>
        (type === 'adhesion' && membership === 'adherent')
        || (type === 'cotisation' && membership === 'cotisant');

    async function handleValidation() {
        showValidationPopup = true;
        validationState = 'loading';

        if (firstTimeCheckingMembership) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            firstTimeCheckingMembership = false;
        }

        let newMe: User<Promotion>;
        try {
            newMe = await getUserProfile(directus);
        } catch (e) {
            validationState = 'error';
            console.error(e);
            return;
        }

        if (hasMembershipUpgraded(newMe.membership_status)) {
            validationState = 'success';
            $me = newMe;
        } else {
            validationState = 'error';
        }
    }

    function handleValidationPopupClose() {
        if (validationState === 'error')
            showValidationPopup = false;
    }
</script>


<style>
    .spinner-container {
        position: absolute;
        inset: 0;
        height: calc(100vh - 4rem);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }

    .iframe-container {
        position: absolute;
        inset: 0;
        height: 100%;
        width: 100%;
        z-index: 10;
    }

    iframe {
        width: 100%;
        height: calc(100vh - 4rem);
        border: medium none;
    }

    .spinner-container, .iframe-container.loaded, .iframe-container.loaded iframe {
        background-color: var(--white);
    }

    .iframe-action-row {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4rem;
        width: 100%;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        background-color: var(--light-gray);
        box-shadow: var(--nav-shadow);
    }

    .validation-popup-cta-bar {
        margin-top: 3rem;
        display: flex;
        justify-content: space-between;
        gap: 2rem;
    }

    @media all and (min-width: 1200px) {
        .iframe-container {
            height: calc(100vh - 8rem);
            padding: 2rem;
        }
    }

    @media all and (max-width: 850px) {
        .validation-popup-cta-bar {
            gap: 1rem;
        }
    }

    @media all and (max-width: 500px) {
        .validation-popup-cta-bar {
            flex-direction: column;
        }
    }
</style>


<div class="spinner-container">
    <LoadingSpinner/>
</div>

<div class="iframe-container" class:loaded>
    <iframe allowtransparency="true" id="haWidget" on:load={() => (loaded = true)}
            onload="window.scroll(0, 0)"
            scrolling="auto"
            src="https://www.helloasso.com/associations/bureau-des-eleves-cesi-nancy/adhesions/{type}-bde/widget"/>
</div>

<div class="iframe-action-row">
    <Button on:click={setCancelPopup(true)} variant="secondary">Annuler</Button>
    <Button icon="{type === 'adhesion' ? 'flame' : 'flash'}-filled-white" on:click={handleValidation}>
        Valider {type === 'adhesion' ? 'l\'adhésion' : 'la cotisation'}
    </Button>
</div>


{#if showCancelPopup}
    <Popup title="Annuler" on:backdropclick={setCancelPopup(false)}>
        <p>Êtes-vous sûr de vouloir annuler {type === 'adhesion' ? 'l\'adhésion' : 'la cotisation'} ?</p>
        <Button variant="secondary" on:click={goToDashboard} slot="cta-l" block>
            Annuler {type === 'adhesion' ? 'l\'adhésion' : 'la cotisation'}
        </Button>
        <Button variant="primary" on:click={setCancelPopup(false)} slot="cta-r" block>
            Continuer {type === 'adhesion' ? 'l\'adhésion' : 'la cotisation'}
        </Button>
    </Popup>
{/if}


{#if showValidationPopup}
    <Popup title="Valider {type === 'adhesion' ? 'l\'adhésion' : 'la cotisation'}"
           on:backdropclick={handleValidationPopupClose}>
        {#if validationState === 'loading'}
            <LoadingSpinner/>
        {:else if validationState === 'success'}
            <p>
                {type === 'adhesion' ? 'L\'adhésion' : 'La cotisation'} a bien été validée !
                Vous êtes désormais {type === 'adhesion' ? 'un adhérant' : 'un cotisant'} ! Félicitations ! 🥳
            </p>
            <div class="validation-popup-cta-bar">
                <Button on:click={goToDashboard} slot="cta" block>
                    Retour à l'espace membre
                </Button>
            </div>
        {:else if validationState === 'error'}
            <p>
                Votre {type === 'adhesion' ? 'adhésion' : 'cotisation'}
                n'est pas détectée dans nos systèmes. Vérifiez que vous avez bien terminé toutes les étapes sur
                HelloAsso, et réessayer. Si le problème persiste,
                <a href="/contact?category=info&subject=Impossible+de+valider+{type === 'adhesion' ? 'mon+adhésion' : 'ma+cotisation'}">
                    contactez-nous
                </a>.
            </p>
            <div class="validation-popup-cta-bar">
                <Button variant="secondary" on:click={goToDashboard} slot="cta-l" block>
                    Retour à l'espace membre
                </Button>
                <Button slot="cta-r" block on:click={handleValidationPopupClose}>
                    Continuer {type === 'adhesion' ? 'l\'adhésion' : 'la cotisation'}
                </Button>
            </div>
        {/if}
    </Popup>
{/if}
