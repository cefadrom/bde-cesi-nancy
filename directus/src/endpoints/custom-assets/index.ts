import { EndpointConfig } from '@types';
import path from 'node:path';

export default {
    id: 'custom-assets',
    handler(router) {
        // Serve the files inside the "./files" directory, and make sure no external files can be accessed
        router.get('/:file', (req, res) => {
            const file = path.resolve(__dirname, 'files', req.params.file);
            if (!file.startsWith(path.resolve(__dirname, 'files')))
                return res.sendStatus(403);
            return res.sendFile(file);
        });
    },
} as EndpointConfig;
