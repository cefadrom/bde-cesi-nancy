import InputContainer from './InputContainer.svelte';

export default {
    title: 'Utils/InputContainer',
    component: InputContainer,
    argTypes: {
        label: {
            type: { name: 'text', required: false },
            control: 'text',
            description: 'The label of the select. If not set or empty, no label is displayed.',
            table: { defaultValue: { summary: 'null' } },
        },
        fullWidth: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the input should take the full width.',
            table: { defaultValue: { summary: false } },
        },
        showInvalidBeforeFocus: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the invalid state style should be displayed before the input has been focused once.',
            table: { defaultValue: { summary: false } },
        },
    },
    parameters: {
        docs: {
            description: {
                component: 'This component is used to wrap input elements, giving them consistent styles and a label, ' +
                    'filtering props and adding some additional features.',
            },
        },
    },
};

const Template = (args) => ({
    component: InputContainer,
    props: args,
});

export const Default = Template.bind({});
Default.args = {
    label: 'Label',
};
