import Input from './Input.svelte';

export default {
    title: 'Common/Input',
    component: Input,
    argTypes: {
        value: {
            type: { name: 'string', required: false },
            control: 'text',
            description: 'The initial value of the input. This prop is reactive and can be used with 2 ways data binding.',
            table: { defaultValue: { summary: '' } },
        },
        label: {
            type: { name: 'text', required: false },
            control: 'text',
            description: 'The label of the input. If not set or empty, no label is displayed.',
            table: { defaultValue: { summary: 'null' } },
        },
        fullWidth: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the input should take the full width.',
            table: { defaultValue: { summary: false } },
        },
        type: {
            type: { name: 'text', required: false },
            description: 'The type of the input.',
            options: ['text', 'email'],
            defaultValue: 'text',
            table: { defaultValue: { summary: 'text' } },
        },
        showInvalidBeforeFocus: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the invalid state style should be displayed before the input has been focused once.',
            table: { defaultValue: { summary: false } },
        },
        'on:keydown': {
            action: 'on:keydown',
            description: 'Event callback when the input is in focus and a key is pressed.',
            type: { name: 'function', required: false },
            table: { defaultValue: { summary: 'null' } },
        },
    },
};

const Template = (args) => ({
    component: Input,
    props: args,
    on: {
        keydown: args['on:keydown'],
    },
});

export const Default = Template({});

export const WithLabel = Template({});
WithLabel.args = {
    label: 'Label',
};

export const Placeholder = Template({});
Placeholder.args = {
    placeholder: 'Placeholder',
};

export const Invalid = Template({});
Invalid.args = {
    required: true,
    showInvalidBeforeFocus: true,
};

export const Disabled = Template({});
Disabled.args = {
    disabled: true,
};
