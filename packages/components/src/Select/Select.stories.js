import Select from './Select.svelte';

export default {
    title: 'Common/Select',
    component: Select,
    argTypes: {
        value: {
            type: { name: 'string', required: false },
            control: 'text',
            description: 'The key of the selected option by default. Value is reactive and can be used with 2 ways data binding.',
            table: { defaultValue: { summary: 'null' } },
        },
        options: {
            type: { name: 'object', required: true },
            control: 'object',
            description: 'Key value pair of options to display in the select.',
            table: { defaultValue: { summary: '{}' } },
        },
        label: {
            type: { name: 'text', required: false },
            control: 'text',
            description: 'The label of the select. If not set or empty, no label is displayed.',
            table: { defaultValue: { summary: 'null' } },
        },
        defaultChoice: {
            type: { name: 'string', required: false },
            control: 'text',
            description: 'The choice that is selected by default, and disabled. This is like a placeholder.',
            table: { defaultValue: { summary: 'null' } },
        },
        fullWidth: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the select should take the full width.',
            table: { defaultValue: { summary: false } },
        },
        showInvalidBeforeFocus: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the invalid state style should be displayed before the input has been focused once.',
            table: { defaultValue: { summary: false } },
        },
        'on:change': {
            action: 'on:change',
            description: 'Event callback when the choice is changed.',
            type: { name: 'function', required: false },
            table: { defaultValue: { summary: 'null' } },
        },
    },
};

const Template = (args) => ({
    component: Select,
    props: args,
    on: {
        change: args['on:change'],
    },
});

export const Default = Template({});
Default.args = {
    options: {
        'option-1': 'Value 1',
        'option-2': 'Value 2',
        'option-3': 'Value 3',
    },
};

export const WithLabel = Template({});
WithLabel.args = {
    label: 'Label',
    options: {
        'option-1': 'Value 1',
        'option-2': 'Value 2',
        'option-3': 'Value 3',
    },
};

export const WithDefaultChoice = Template({});
WithDefaultChoice.args = {
    options: {
        'option-1': 'Value 1',
        'option-2': 'Value 2',
        'option-3': 'Value 3',
    },
    defaultChoice: 'Please select a choice',
};

export const Disabled = Template({});
Disabled.args = {
    options: {
        'option-1': 'Value 1',
    },
    selectedKey: 'option-1',
    disabled: true,
};
