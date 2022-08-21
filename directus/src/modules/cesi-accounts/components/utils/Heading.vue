<template>
    <div class="heading" :class="{ 'add-margin-top': !first }">
        <v-divider :inlineTitle="false" large>
            <slot/>
            <template v-slot:icon>
                <v-icon :name="icon"/>
            </template>
        </v-divider>
    </div>
</template>

<script setup lang="ts">
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
