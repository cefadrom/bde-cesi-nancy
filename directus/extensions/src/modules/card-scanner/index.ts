import { defineModule } from '@directus/extensions-sdk';
import Index from './index.vue';


const CAFET_ROLE_ID = 'af32a550-a3c4-47fa-b418-bcd35b9a0ffe';


export default defineModule({
    id: 'card-scanner',
    name: 'Scanneur de cartes',
    icon: 'qr_code_scanner',
    preRegisterCheck: user => user.role.admin_access || user.role.id === CAFET_ROLE_ID,
    routes: [
        {
            path: '',
            component: Index,
        },
    ],
});
