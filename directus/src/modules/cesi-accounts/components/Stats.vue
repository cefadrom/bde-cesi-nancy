<template>
    <Heading icon="insights" first>État actuel</Heading>

    <div>
        Comptes viacesi dans la base de données : {{ accountsCount ? accountsCount : '...' }}
        <br/>
        Dernière mise à jour : {{ formattedDate }}
    </div>
</template>

<script lang="ts" setup>
import { useApi } from '@directus/extensions-sdk';
import { computed, onMounted, ref } from 'vue';
import Heading from './utils/Heading.vue';

const api = useApi();
const accountsCount = ref<null | number>(null);
const lastAccountsUpdate = ref<null | Date>(null);

const formattedDate = computed(() => {
    if (!lastAccountsUpdate.value)
        return '...';
    if (isNaN(lastAccountsUpdate.value.getTime()))
        return '-';
    return lastAccountsUpdate.value.toLocaleDateString('fr')
        + ' ' + lastAccountsUpdate.value.getHours()
        + ':' + lastAccountsUpdate.value.getMinutes();
});

function refreshStats() {
    api.get('/items/cesi_accounts?meta=total_count&limit=0')
        .then(({ data }) => accountsCount.value = data.meta.total_count);
    api.get('/items/cesi_accounts_updates?limit=1&sort=-date_created&fields[]=date_created')
        .then(({ data }) => lastAccountsUpdate.value = new Date(data.data?.[0]?.date_created));
}

onMounted(refreshStats);
</script>
