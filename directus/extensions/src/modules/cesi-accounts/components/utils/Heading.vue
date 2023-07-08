<template>
    <div :class="{ 'add-margin-top': !first }" class="heading">
        <v-divider :inlineTitle="false" large>
            <slot/>
            <template v-slot:icon>
                <v-icon :name="icon"/>
            </template>
        </v-divider>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    icon: string,
    first?: boolean,
}>();
</script>

<style scoped>
.heading {
    margin-bottom: 40px;
}

.add-margin-top {
    margin-top: 60px;
}
</style>
