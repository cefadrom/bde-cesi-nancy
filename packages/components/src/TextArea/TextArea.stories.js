import TextArea from './TextArea.svelte';

export default {
    title: 'Common/TextArea',
    component: TextArea,
    argTypes: {
        value: {
            type: { name: 'string', required: false },
            control: 'text',
            description: 'The initial value of the textarea. This prop is reactive and can be used with 2 ways data binding.',
            table: { defaultValue: { summary: '' } },
        },
        label: {
            type: { name: 'text', required: false },
            control: 'text',
            description: 'The label of the textarea. If not set or empty, no label is displayed.',
            table: { defaultValue: { summary: 'null' } },
        },
        fullWidth: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the textarea should take the full width.',
            table: { defaultValue: { summary: false } },
        },
        resizeY: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the textarea could be resized vertically.',
            table: { defaultValue: { summary: false } },
        },
        autogrow: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the textarea could automatically grow up vertically based on its content.',
            table: { defaultValue: { summary: false } },
        },
        showInvalidBeforeFocus: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the invalid state style should be displayed before the input has been focused once.',
            table: { defaultValue: { summary: false } },
        },
        'on:keydown': {
            action: 'on:keydown',
            description: 'Event callback when the textarea is in focus and a key is pressed.',
            type: { name: 'function', required: false },
            table: { defaultValue: { summary: 'null' } },
        },
    },
};

const Template = (args) => ({
    component: TextArea,
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

export const ResizeY = Template({});
ResizeY.args = {
    resizeY: true,
    value: 'This is\nsome example\ncontent\nfor resizable\ntextarea.',
};

export const Autogrow = Template({});
Autogrow.args = {
    autogrow: true,
    value: 'This is\nsome example\ncontent\nfor autogrow\ntextarea.',
};
