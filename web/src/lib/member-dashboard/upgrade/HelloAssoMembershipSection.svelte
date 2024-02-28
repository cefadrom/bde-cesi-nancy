<script lang="ts">
    import { goto } from '$app/navigation';
    import { fetchUserProfile } from '$lib/api/fetchUserProfile';
    import { getDirectus, getUserProfile } from '$lib/context';
    import type { UserProfile } from '$lib/types';
    import Button from '@bde-cesi-nancy/components/src/Button/Button.svelte';
    import LoadingSpinner from '@bde-cesi-nancy/components/src/LoadingSpinner/LoadingSpinner.svelte';
    import Popup from '@bde-cesi-nancy/components/src/Popup/Popup.svelte';
    import { onDestroy, onMount } from 'svelte';

    export let type: 'adhesion' | 'cotisation';

    const directus = getDirectus();
    const me = getUserProfile();

    let loaded = false;
    let showCancelPopup = false;
    let showValidationPopup = false;
    let firstTimeCheckingMembership = true;
    let newMe: UserProfile | null = null;
    let validationState: 'loading' | 'success' | 'error' = 'loading';

    let eventSource: EventSource | null = null;

    onMount(() => {
        document.querySelector('html')!.classList.add('no-body-scroll');

        // Notify user when the server sends he's now a member (using SSE)
        eventSource = new EventSource(`${directus.url}/helloasso/hook/${$me.id}`);
        eventSource.onmessage = ({ data }: MessageEvent) => {
            if (data !== 'ok')
                return;
            handleValidation(false);
            eventSource!.close();
            eventSource = null;
        };
        eventSource.onerror = (event: Event) => {
            console.error(event);
            eventSource?.close();
            eventSource = null;
        };
    });
    onDestroy(() => {
        document.querySelector('html')!.classList.remove('no-body-scroll');
        eventSource?.close();
    });

    const setCancelPopup = (state: boolean) => () => {
        showCancelPopup = state;
    };

    function goToDashboard() {
        if (newMe && hasMembershipUpgraded(newMe.membership_status))
            $me = newMe;
        goto('/member-dashboard');
    }

    const hasMembershipUpgraded = (membership: string) =>
        (type === 'adhesion' && membership === 'adherent')
        || (type === 'cotisation' && membership === 'cotisant');

    async function handleValidation(delay = true) {
        showValidationPopup = true;
        validationState = 'loading';

        if (firstTimeCheckingMembership && delay) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            firstTimeCheckingMembership = false;
        }

        try {
            newMe = await fetchUserProfile(directus);
        } catch (e) {
            validationState = 'error';
            console.error(e);
            return;
        }

        if (hasMembershipUpgraded(newMe.membership_status))
            validationState = 'success';
        else
            validationState = 'error';
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
    <iframe allowtransparency
            on:load={() => (loaded = true)}
            title="{type === 'adhesion' ? 'Adhésion' : 'Cotisation'} HelloAsso"
            src="https://www.helloasso.com/associations/bureau-des-eleves-cesi-nancy/adhesions/{type}-bde/widget"/>
</div>

<div class="iframe-action-row">
    <Button on:click={setCancelPopup(true)} variant="secondary">Annuler</Button>
    <Button icon="{type === 'adhesion' ? 'flame' : 'flash'}-filled-white" on:click={() => handleValidation(true)}>
        Valider {type === 'adhesion' ? 'l\'adhésion' : 'la cotisation'}
    </Button>
</div>


{#if showCancelPopup}
    <Popup title="Annuler" on:backdropclick={setCancelPopup(false)} on:escape={setCancelPopup(false)}>
        <p>
            Êtes-vous sûr de vouloir annuler
            <span class="no-br">{type === 'adhesion' ? 'l\'adhésion' : 'la cotisation'} ?</span>
        </p>
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
           on:backdropclick={handleValidationPopupClose}
           on:escape={handleValidationPopupClose}>
        {#if validationState === 'loading'}
            <LoadingSpinner/>
        {:else if validationState === 'success'}
            <p>
                {type === 'adhesion' ? 'L\'adhésion' : 'La cotisation'} a bien été validée !
                Vous êtes désormais un
                <span class="no-br">{type === 'adhesion' ? 'adhérant' : 'cotisant'} !</span>
                <span class="no-br">Félicitations ! 🥳</span>
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
                HelloAsso avec votre adresse mail <span class="bold">viacesi</span>, puis réessayez.
                Si le problème persiste,
                <a href="/contact?category=info&subject=Impossible+de+valider+{type === 'adhesion' ? 'mon+adhésion' : 'ma+cotisation'}"
                   class="link">contactez-nous</a>.
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
