<template>
    <private-view title="Scanneur de cartes">
        <template #title-outer:prepend>
            <v-button disabled icon rounded secondary>
                <v-icon name="qr_code_scanner"/>
            </v-button>
        </template>

        <div class="layout">
            <Scanner @error="err => handleError(err, 10000)" @scan="handleScanResult"/>
            <div class="results">
                <div v-if="error" class="error">
                    <v-notice type="danger">
                        {{ error }}
                    </v-notice>
                </div>
                <UserProfile v-else-if="user" :user="user"/>
                <div v-else class="loader">
                    <v-progress-circular indeterminate xLarge/>
                </div>
            </div>
        </div>
    </private-view>
</template>


<script lang="ts" setup>
import type { Promotion, User } from '@bde-cesi-nancy/types';
import { useApi } from '@directus/extensions-sdk';
import type { AxiosInstance } from 'axios';
import type { default as IQrScanner } from 'qr-scanner';
import { ref } from 'vue';
import Scanner from './components/Scanner.vue';
import UserProfile from './components/UserProfile.vue';

const scanResult = ref<string | null>(null);
const error = ref<string | null>(null);
const loading = ref<boolean>(false);
const user = ref<User<Promotion> | null>(null);
const errorClearTimeout = ref<number | NodeJS.Timeout | null>(null);

const api: AxiosInstance = useApi();

function handleError(err: Error | string, clear: number | null = null) {
    err = err instanceof Error ? err.message : err;
    if (err.toLowerCase().includes('no qr code found'))
        return;

    if (typeof errorClearTimeout.value === 'number') {
        clearTimeout(errorClearTimeout.value);
        errorClearTimeout.value = null;
    }

    if (typeof clear === 'number')
        errorClearTimeout.value = setTimeout(() => {
            error.value = null;
            scanResult.value = null;
        }, clear);

    error.value = err;
    user.value = null;
    loading.value = false;
}

async function handleScanResult({ data }: IQrScanner.ScanResult) {
    if (scanResult.value === data || loading.value)
        return;
    if (!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(data)) {
        handleError('QR code invalide', 5000);
        return;
    }
    scanResult.value = data;
    loading.value = true;
    error.value = null;
    try {
        const res = await api.get(`/users/${data}?fields=id,first_name,last_name,promotion.code,promotion.name,membership_status,status,role.id,role.name`);
        user.value = res.data.data;
        navigator.vibrate(200);
    } catch (e) {
        handleError('Impossible de trouver l\'utilisateur', 10000);
        navigator.vibrate(1200);
    } finally {
        loading.value = false;
    }
}
</script>


<style scoped>
.layout {
    padding: var(--content-padding);
}

.error {
    margin-top: 20px;
}

.loader {
    margin-top: 10vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
