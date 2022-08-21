/**
 * https://github.com/directus/directus/blob/main/app/src/utils/format-filesize.ts
 *
 * Turns a bytes number into a human-readable filesize
 *
 * @param bytes - Number of bytes
 * @param decimal - Whether you want power of ten (default) or power of two (f.e. MB vs MiB)
 *
 * @example
 * ```js
 * formatFilesize(12500);
 * // => "12.5 ko"
 * ```
 */
export function formatFilesize(bytes = 0, decimal = true): string {
    const threshold = decimal ? 1000 : 1024;

    if (!Boolean(bytes)) {
        return '--';
    }

    if (Math.abs(bytes) < threshold) {
        return `${bytes} o`;
    }

    const units = decimal
        ? [ 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo' ]
        : [ 'Kio', 'Mio', 'Gio', 'Tio', 'Pio', 'Eio', 'Zio', 'Yio' ];

    let unitIndex = -1;
    let remainingBytes = bytes;

    do {
        remainingBytes /= threshold;
        unitIndex += 1;
    } while (Math.abs(remainingBytes) >= threshold && unitIndex < units.length - 1);

    return `${remainingBytes.toFixed(1)} ${units[unitIndex]}`;
}
