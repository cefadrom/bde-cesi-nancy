<template>
    <router-link :to="`/users/${user.id}`">
        <div class="user-layout">
            <v-button rounded disabled icon secondary xLarge>
                <v-icon name="account_circle" xLarge disable/>
            </v-button>
            <div>
                <h3>
                    {{ user.first_name }} {{ user.last_name }}
                    ({{ user.promotion?.name || user.promotion?.code || user.promotion }})
                </h3>
                <p>
                    {{ user.role?.name }}, {{ status }}
                </p>
                <p :class="membershipChipColor">
                    <v-chip>{{ membership }}</v-chip>
                </p>
            </div>
        </div>
    </router-link>
</template>


<script setup lang="ts">
import type { Promotion, User } from '@bde-cesi-nancy/types';
import { computed, defineProps } from 'vue';

const props = defineProps<{
    user: User<Promotion>,
}>();

const membership = computed(() => {
    switch (props.user.membership_status) {
        case 'aucun':
            return 'Aucune adhésion / cotisation';
        case 'adherent':
            return 'Adhérent';
        case 'cotisant':
            return 'Cotisant';
        default:
            return 'Inconnu';
    }
});

const membershipChipColor = computed(() => {
    switch (props.user.membership_status) {
        case 'aucun':
            return 'chip-aucun';
        case 'adherent':
            return 'chip-adherent';
        case 'cotisant':
            return 'chip-cotisant';
    }
});

const status = computed(() => {
    switch (props.user.status) {
        case 'draft':
            return 'brouillon';
        case 'invited':
            return 'invité';
        case 'active':
            return 'actif';
        case 'suspended':
            return 'suspendu';
        case 'archived':
            return 'archivé';
        default:
            return 'inconnu';
    }
});
</script>


<style scoped>
.user-layout {
    background-color: var(--background-normal);
    border-radius: calc(var(--border-radius) + 4px);
    padding: 20px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    margin-top: 20px;
}

.chip-aucun {
    --v-chip-color: var(--foreground-normal);
    --v-chip-background-color: var(--background-normal);
}

.chip-adherent {
    --v-chip-color: #FFC23B;
    --v-chip-background-color: #664c17;
}

.chip-cotisant {
    --v-chip-color: var(--primary);
    --v-chip-background-color: var(--primary-25);
}

h3 {
    font-weight: 600;
}

p {
    margin-top: 8px;
}
</style>
