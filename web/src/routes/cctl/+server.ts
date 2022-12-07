import type {RequestHandler} from './$types';
import { redirect} from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    throw redirect(302, 'https://viacesifr-my.sharepoint.com/:f:/g/personal/bde-cesi-nancy_viacesi_fr/EkO7Q6-szHxPrjmpz6had-wBOWDoqfu4AcLrvJpKCdjY8w?e=U9kj0w');
}
