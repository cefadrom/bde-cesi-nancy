<script lang="ts">
    export let status: 'aucun' | 'adherant' | 'cotisant';
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
    <h3 class="header-3">Information erronée ?</h3>
    <p>
        Une de tes informations est erronée ?
        <a href="/contact?category=info&subject=Information+erronée">Contacte-nous !</a>
    </p>

    {#if status === 'aucun'}
        <h3 class="header-3">Tu n’es pas encore adhérent à l’association 🥺</h3>
        <p>En devenant adhérent <span class="bold">gratuitement</span>, tu pourra :</p>
        <ul>
            <li>Profiter des évènements du BDE</li>
            <li>Avoir accès au nouveau local détente, jeux, etc...</li>
            <li>Avoir des prix réduits à l’épicerie</li>
            <li>Bénéficier d'avantages chez nos partenaires</li>
        </ul>
        <p>Alors clique sur le bouton ci-dessous !</p>
    {:else if status === 'adherant'}
        <h3 class="header-3">Tu en veux encore plus ?</h3>
        <p>En devenant cotisant, tu aura accès à des prix exclusifs sur tout ce que propose l’association :</p>
        <ul>
            <li>Encore plus de réductions à l’épicerie</li>
            <li>Des réductions sur tous les évènements</li>
            <li>Des réductions sur toutes les ventes (sweat, tee-shirt ...)</li>
        </ul>
        <p>Alors clique sur le bouton ci-dessous !</p>
    {/if}
</div>
