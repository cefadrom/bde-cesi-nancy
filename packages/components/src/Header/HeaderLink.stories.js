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
