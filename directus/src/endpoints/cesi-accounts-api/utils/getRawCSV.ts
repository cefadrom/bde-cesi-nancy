import type { Request } from 'express';
import type { Knex } from 'knex';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function getRawCSV(req: Request, knex: Knex, storageLocalRoot: string): Promise<IReadResult> {
    const fileID = req.body?.file;
    if (typeof fileID !== 'string')
        return { error: 'Missing "file" field', status: 400 };

    const file = await knex('directus_files')
        .select('*')
        .where({ id: fileID })
        .first();

    if (!file)
        return { error: 'File not found', status: 404 };
    if (file.type !== 'application/vnd.ms-excel')
        return { error: 'File is not a CSV', status: 400 };

    const filePath = path.resolve(storageLocalRoot, file.filename_disk);
    const content = await fs.readFile(filePath).then(data => data.toString().trim());

    return { content };
}


export interface IReadResult {
    content?: string;
    error?: string;
    status?: number;
}
