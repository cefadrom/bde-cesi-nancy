import Popup from './Popup.svelte';

export default {
    title: 'Common/Popup',
    component: Popup,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        title: {
            type: { name: 'string', required: false },
            defaultValue: 'Popup title',
            description: 'The title of the popup. If not provided, the title will not be displayed.',
            table: {
                defaultValue: { summary: 'null' },
            }
        },
        'on:backdropclick': {
            action: 'on:backdropclick',
            description: 'Event callback when the backdrop of the popup is pressed.',
            type: { name: 'function', required: false },
            table: { defaultValue: { summary: 'null' } },
        },
    }
};

const Template = ({ ...args }) => ({
    Component: Popup,
    props: args,
    on: {
        backdropclick: args['on:backdropclick'],
    },
});

export const Default = Template.bind({});
