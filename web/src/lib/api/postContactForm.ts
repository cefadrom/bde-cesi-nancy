import { env } from '$env/dynamic/public';
import type { IContactFormData } from '@bde-cesi-nancy/types/api';


export async function postContactForm(form: IContactFormData) {
    const res = await fetch(`${env.PUBLIC_DIRECTUS_URL}/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });

    if (res.ok)
        return;

    const json = await res.json();
    throw new Error(json.error);
}
