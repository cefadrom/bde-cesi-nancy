import { defineDisplay } from '@directus/extensions-sdk';

export default defineDisplay({
    id: 'money',
    name: 'Money',
    icon: 'monetization_on',
    description: 'Display a currency value in euros',
    component: function ({ value }: { value: number }) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(value);
    },
    options: null,
    types: [ 'integer', 'float', 'decimal' ],
});
