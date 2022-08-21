<template>
    <Heading icon="insights" first>État actuel</Heading>

    <div>
        Comptes viacesi dans la base de données : {{ accountsCount === -1 ? '...' : accountsCount }}
    </div>
</template>

<script setup>
import { useApi } from '@directus/extensions-sdk';
import { onMounted, ref } from 'vue';
import Heading from './utils/Heading.vue';

const api = useApi();
const accountsCount = ref(-1);

onMounted(() => {
    api.get('/items/cesi_accounts?meta=total_count&limit=0')
        .then(({ data }) => accountsCount.value = data.meta.total_count);
});
</script>
