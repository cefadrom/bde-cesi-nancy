import { defineModule } from '@directus/extensions-sdk';
import ModuleComponent from './module.vue';

export default defineModule({
    id: 'cesi-accounts',
    name: 'Comptes CESI',
    icon: 'admin_panel_settings',
    preRegisterCheck: user => user.role.admin_access,
    routes: [
        {
            path: '',
            component: ModuleComponent,
        },
    ],
});
