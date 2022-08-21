<template>
    <private-view title="Comptes CESI">
        <template #title-outer:prepend>
            <v-button rounded disabled icon secondary>
                <v-icon name="admin_panel_settings"/>
            </v-button>
        </template>

        <div class="layout">
            <Stats/>
            <Update/>
            <!-- TODO: update history -->
            <!-- TODO: live update stats -->
        </div>
    </private-view>
</template>

<script setup lang="ts">
import Stats from '../components/Stats.vue';
import Update from '../components/Update.vue';</script>

<style scoped>
.layout {
    padding: var(--content-padding);
}
</style>
