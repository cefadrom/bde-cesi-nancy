<template>
    <video ref="video"/>
</template>


<script setup lang="ts">
import type { default as IQrScanner } from 'qr-scanner';
import { onBeforeUnmount, ref, watch } from 'vue';

const video = ref<HTMLVideoElement>();
const scanner = ref<IQrScanner>();

const emit = defineEmits<{
    (event: 'scan', result: IQrScanner.ScanResult): void;
    (event: 'error', error: string): void;
}>();

const SCANNER_PATH = '/custom-assets/qr-scanner.min.js';

watch(video, async (video) => {
    if (!video && scanner.value)
        return;
    const QrScanner = (await import(SCANNER_PATH)).default;
    scanner.value = new QrScanner(
        video,
        res => emit('scan', res),
        {
            highlightScanRegion: true,
            highlightCodeOutline: true,
            onDecodeError: err => emit('error', err),
        },
    );
    scanner.value.setInversionMode('both');
    scanner.value.start();
});

onBeforeUnmount(() => {
    scanner.value?.stop();
});
</script>


<style scoped>
video {
    width: 100%;
    height: 60vh;
    object-fit: cover;
    background-color: #050409;
    border-radius: calc(var(--border-radius) + 4px);
}

:global(.scan-region-highlight-svg) {
    stroke: var(--brand) !important;
}

:global(.code-outline-highlight) {
    stroke: var(--brand) !important;
}
</style>
