import Button from './Button.svelte';

export default {
    title: 'Common/Button',
    component: Button,
    argTypes: {
        variant: {
            type: { name: 'string', required: false },
            defaultValue: 'primary',
            description: 'The button variant.',
            control: {
                type: 'select',
                options: ['primary', 'secondary', 'outline'],
            },
            table: {
                defaultValue: { summary: 'primary' },
            },
        },
        disabled: {
            type: { name: 'boolean', required: false },
            defaultValue: false,
            description: 'If the button is disabled.',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        block: {
            type: { name: 'boolean', required: false },
            defaultValue: false,
            description: 'If the button should take the entire display width.',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        icon: {
            type: { name: 'string', required: false },
            control: 'select',
            options: ['home-filled-black', 'home-filled-white', 'person-filled-black', 'heart-filled-white'],
            description: 'The file name of the icon, inside the /icons folder of the web static, and without the .svg extension.',
            table: {
                defaultValue: { summary: 'null' },
            },
        },
        'on:click': {
            action: 'on:click',
            description: 'Event callback when the button is pressed.',
            type: { name: 'function', required: false },
            table: { defaultValue: { summary: 'null' } },
        },
    }
};


const Template = (args) => ({
    Component: Button,
    props: args,
    on: {
        click: args['on:click'],
    },
});


export const Primary = Template.bind({});

export const Secondary = Template.bind({});
Secondary.args = {
    variant: 'secondary',
};

export const Outline = Template.bind({});
Outline.args = {
    variant: 'outline',
};

export const Disabled = Template.bind({});
Disabled.args = {
    variant: 'primary',
    disabled: true,
};

export const Block = Template.bind({});
Block.args = {
    variant: 'primary',
    disabled: false,
    block: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    variant: 'primary',
    disabled: false,
    block: false,
    icon: 'heart-filled-white',
};
