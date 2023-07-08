import { defineEndpoint } from '@directus/extensions-sdk';
import nodeFetch from 'node-fetch';


const assets = new Map<string, string>([
    [ 'qr-scanner.min.js', 'https://www.unpkg.com/qr-scanner@1.4.2/qr-scanner.min.js' ],
    [ 'qr-scanner-worker.min.js', 'https://www.unpkg.com/qr-scanner@1.4.2/qr-scanner-worker.min.js' ],
]);


/**
 * Custom endpoint to serve external assets that need to be loaded by the frontend on the same domain.
 */
export default defineEndpoint({
    id: 'custom-assets',
    handler(router) {
        router.get('/:file', async (req, res) => {
            const file = req.params.file;

            const url = assets.get(file);
            if (!url)
                return res.status(404).json({ error: 'File not found' });

            const response = await nodeFetch(url);
            const text = await response.text();

            res.set('Content-Type', 'application/javascript');
            return res.send(text);
        });
    },
});
