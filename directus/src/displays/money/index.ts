import type { DisplayConfig } from '@types';

export default {
    id: 'money',
    name: 'Money',
    icon: 'monetization_on',
    description: 'Display a currency value',
    component: function ({ value }: { value: number }) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(value);
    },
    options: null,
    types: [ 'integer', 'float', 'decimal' ],
} as DisplayConfig;
