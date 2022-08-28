import ClubCard from './ClubCard.svelte';

export default {
    title: 'Web/ClubCard',
    component: ClubCard,
    argTypes: {
        club: {
            type: { name: 'object', required: true },
            description: 'The club to display.',
            control: { type: 'object' },
            defaultValue: {
                name: 'Club name',
                description: 'Club description',
                president_name: 'President Name',
                contact_email: 'contact@email.com',
            }
        }
    }
};

export const Default = (args) => ({
    component: ClubCard,
    props: args,
});
