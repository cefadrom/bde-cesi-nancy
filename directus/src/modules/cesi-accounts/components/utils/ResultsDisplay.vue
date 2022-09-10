<template>
    <h1>Mise à jour effectuée avec succès !</h1>

    <h2>Parsing</h2>
    <p class="section">
        Durée du parsing : {{ (results.parseMeta.operationTime / 1000).toFixed(1) }} s
        <br/>
        Comptes trouvés dans le fichier : {{ results.parseMeta.accountsParsed }}
        <br/>
        Comptes gardés : {{ results.parseMeta.accountsKept }}
        ({{ (results.parseMeta.accountsKept / results.parseMeta.accountsParsed * 100).toFixed(1) }}%)
    </p>

    <div v-if="results.parseErrors.length > 0">
        <h2>Erreurs de parsing ({{ results.parseErrors.length }})</h2>
        <div class="section">
            <p v-for="parseError in results.parseErrors.slice(0, 10)" class="parsing-error">
                [{{ parseError.code }}] {{ parseError.type }}, ligne {{ parseError.row }}
                <br/>
                {{ parseError.message }}
            </p>
        </div>
    </div>

    <h2>Mise à jour de la BDD</h2>
    <p class="section">
        Durée de l'opération : {{ (results.databaseUpdateDuration / 1000).toFixed(1) }} s
        <br/>
        Promotions ajoutées : {{ results.addedPromotionsCount }}
        <br/>
        Promotions supprimées : {{ results.deletedPromotionsCount }}
        <br/>
        Comptes ajoutés : {{ results.addedAccountsCount }}
        <br/>
        Comptes mis à jour : {{ results.updatedAccountsCount }}
        <br/>
        Comptes supprimés : {{ results.deletedAccountsCount }}
        <br/>
        Utilisateurs mis à jour : {{ results.updatedUsersCount }}
    </p>

    <div class="btn-containers">
        <v-button fullWidth primary @click="$emit('clear')" class="button">
            Recommencer
        </v-button>
        <v-button fullWidth danger
                  @click="handleFileDelete"
                  :loading="fileState === 'deleting'"
                  v-if="fileState !== 'deleted'">
            Supprimer le fichier
        </v-button>
    </div>
</template>

<script setup lang="ts">
import { useApi } from '@directus/extensions-sdk';
import { ref } from 'vue';

const props = defineProps<{
    results: IUpdateResult,
    file: string,
}>();

defineEmits<{
    (eventName: 'clear'): void,
}>();


const api = useApi();
const fileState = ref<'untouched' | 'deleting' | 'deleted'>('untouched');

async function handleFileDelete() {
    fileState.value = 'deleting';
    await api.delete(`/files/${props.file}`);
    fileState.value = 'deleted';
}


interface IUpdateResult {
    parseMeta: {
        accountsParsed: number,
        accountsKept: number,
        operationTime: number,
    },
    parseErrors: {
        type: string,
        code: string,
        message: string,
        row: number
    }[],
    addedPromotionsCount: number,
    deletedPromotionsCount: number,
    addedAccountsCount: number,
    updatedAccountsCount: number,
    deletedAccountsCount: number,
    updatedUsersCount: number,
    databaseUpdateDuration: number,
}
</script>

<style scoped>
h1 {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 25px;
}

h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 15px;
}

.parsing-error {
    margin-bottom: 10px;
}

.section {
    margin-bottom: 30px;
}

.btn-containers {
    width: 100%;
    max-width: 400px;
}

.button {
    margin-bottom: 15px;
}
</style>
