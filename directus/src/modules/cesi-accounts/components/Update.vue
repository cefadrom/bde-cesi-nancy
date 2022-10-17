<template>
    <Heading icon="refresh">Mise à jour</Heading>
    <v-notice type="danger" v-if="error" class="notice">{{ error }}</v-notice>
    <div v-if="!updateResult">
        <v-upload folder="f324901c-135c-4def-8531-e8783ea27d84"
                  fromLibrary
                  v-if="!file"
                  @input="handleFileSelect"/>
        <FileStatBar v-else
                     :filename="file.filename_download"
                     :filesize="file.filesize"
                     :fileid="file.id"
                     :loading="updatingAccounts"
                     @clear="handleClearFile"/>
        <v-button fullWidth :disabled="!file || error"
                  @click="handleProcess"
                  class="validate-btn"
                  :loading="updatingAccounts">
            Valider
        </v-button>
    </div>
    <ResultsDisplay v-else :results="updateResult" @clear="handleClearUpdateResult" :file="file.id"/>
</template>

<script setup lang="ts">
import { useApi } from '@directus/extensions-sdk';
import { ref } from 'vue';
import FileStatBar from './utils/FileStatBar.vue';
import Heading from './utils/Heading.vue';
import ResultsDisplay from './utils/ResultsDisplay.vue';


interface IUploadFile {
    id: string,
    filename_disk: string,
    filename_download: string,
    type: string,
    folder: string,
    filesize: number,
}


const api = useApi();
const file = ref<IUploadFile | null>(null);
const error = ref<string | null>(null);
const updatingAccounts = ref(false);
const updateResult = ref(null);


function handleFileSelect(f: IUploadFile) {
    error.value = null;
    if (![ 'application/vnd.ms-excel', 'text/csv' ].includes(f.type))
        error.value = 'Le fichier doit être un CSV';
    file.value = f;
}


function handleClearFile() {
    file.value = null;
    error.value = null;
}


async function handleProcess() {
    if (!file.value || updatingAccounts.value)
        return;

    try {
        updatingAccounts.value = true;
        const { status, statusText, data } = await api.post('/cesi-accounts-api', {
            file: (file.value as IUploadFile).id,
        });
        updatingAccounts.value = false;

        if (statusText !== 'OK') {
            error.value = data?.error || `Erreur ${status}: ${statusText}`;
            return;
        }

        updateResult.value = data;
    } catch (e) {
        error.value = e.message;
    }
}


function handleClearUpdateResult() {
    file.value = null;
    error.value = null;
    updatingAccounts.value = false;
    updateResult.value = null;
}
</script>

<style scoped>
.notice {
    margin-bottom: 20px;
}

.validate-btn {
    margin: 20px 0;
}
</style>
