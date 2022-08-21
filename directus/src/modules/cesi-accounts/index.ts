import type { ModuleConfig } from '@types';
import Index from './routes/index.vue';


export default {
    id: 'cesi-accounts',
    name: 'Comptes CESI',
    icon: 'admin_panel_settings',
    routes: [
        {
            path: '',
            component: Index,
        },
    ],
} as ModuleConfig;
