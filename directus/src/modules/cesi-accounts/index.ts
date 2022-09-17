import type { ModuleConfig } from '@types';
import Index from './routes/index.vue';


export default {
    id: 'cesi-accounts',
    name: 'Comptes CESI',
    icon: 'admin_panel_settings',
    preRegisterCheck: user => user.role.admin_access,
    routes: [
        {
            path: '',
            component: Index,
        },
    ],
} as ModuleConfig;
