import HeaderLink from './HeaderLink.svelte';

export default {
    title: 'Web/Header/HeaderLink',
    component: HeaderLink,
    argTypes: {
        href: {
            type: { name: 'string', required: true },
            control: 'text',
            description: 'The link href.',
            defaultValue: '#',
        },
        label: {
            type: { name: 'string', required: true },
            control: 'text',
            description: 'The link label.',
            defaultValue: 'Label',
        },
        icon: {
            type: { name: 'string', required: true },
            control: 'select',
            options: ['bonfire-filled-black', 'diamond-filled-black', 'home-filled-black', 'mail-filled-black', 'people-filled-black', 'person-filled-black'],
            description: 'The file name of the icon, inside the /icons folder of the web static, and without the .svg extension.',
            defaultValue: 'home-filled-black',
        },
        current: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the link is associated with the current page. If not set, the link will automatically detect if the page is associated with it.',
            table: { defaultValue: { summary: 'null' } },
        }
    }
};

const Template = args => ({
    Component: HeaderLink,
    props: args,
});

export const Default = Template.bind({});

export const Current = Template.bind({});
Current.args = {
    current: true,
};
