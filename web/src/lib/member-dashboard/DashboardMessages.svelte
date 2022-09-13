<script lang="ts">
    export let status: 'aucun' | 'adherent' | 'cotisant';
</script>


<style>
    p {
        margin: .25rem 0;
    }

    ul {
        margin: 0;
        padding-left: 1.5rem;
    }

    h3:not(:first-of-type) {
        margin-top: 2rem;
    }
</style>


<div>
    <h3 class="header-3">Information <span class="no-br">erronée ?</span></h3>
    <p>
        Une de tes informations est <span class="no-br">erronée ?</span>
        <a class="no-br" href="/contact?category=info&subject=Information+erronée">Contacte-nous !</a>
    </p>

    {#if status === 'aucun'}
        <h3 class="header-3">Tu n’es pas encore adhérent à <span class="no-br">l’association 🥺</span></h3>
        <p>En devenant adhérent <span class="bold">gratuitement</span>, tu <span class="no-br">pourra :</span></p>
        <ul>
            <li>Profiter des évènements du BDE</li>
            <li>Avoir accès au nouveau local détente, jeux, <span class="no-br">etc...</span></li>
            <li>Avoir des prix réduits à l’épicerie</li>
            <li>Bénéficier d'avantages chez nos partenaires</li>
        </ul>
        <p>Alors clique sur le bouton <span class="no-br">ci-dessous !</span></p>
    {:else if status === 'adherent'}
        <h3 class="header-3">Tu en veux encore <span class="no-br">plus ?</span></h3>
        <p>
            En devenant cotisant, tu aura accès à des prix exclusifs sur tout ce que propose
            <span class="no-br">l’association :</span>
        </p>
        <ul>
            <li>Encore plus de réductions à l’épicerie</li>
            <li>Des réductions sur tous les évènements</li>
            <li>Des réductions sur toutes les ventes (sweat, <span class="no-br">tee-shirt ...)</span></li>
        </ul>
        <p>Alors clique sur le bouton <span class="no-br">ci-dessous !</span></p>
    {/if}
</div>
