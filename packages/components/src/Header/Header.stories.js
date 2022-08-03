import Header from './Header.svelte';

export default {
    title: 'Web/Header/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
};

export const Default = args => ({
    Component: Header,
    args,
});
