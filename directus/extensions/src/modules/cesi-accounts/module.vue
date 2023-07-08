<template>
    <private-view title="Comptes CESI">
        <template #title-outer:prepend>
            <v-button disabled icon rounded secondary>
                <v-icon name="admin_panel_settings"/>
            </v-button>
        </template>

        <div v-if="userStore.isAdmin" class="layout">
            <!-- TODO: live update stats -->
            <Stats/>
            <Update/>
        </div>
        <div v-else class="layout">
            <v-info center icon="error" title="Accès refusé" type="danger">
                Vous devez être administrateur pour accéder à cette page.
            </v-info>
        </div>
    </private-view>
</template>

<script lang="ts" setup>
import { useStores } from '@directus/extensions-sdk';
import Stats from './components/Stats.vue';
import Update from './components/Update.vue';

const { useUserStore } = useStores();
const userStore = useUserStore();
</script>

<style scoped>
.layout {
    padding: var(--content-padding);
}
</style>
