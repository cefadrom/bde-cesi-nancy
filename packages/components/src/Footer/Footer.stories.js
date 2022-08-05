import Footer from './Footer.svelte';

export default {
    title: 'Web/Footer',
    component: Footer,
    parameters: {
        layout: 'fullscreen',
    },
};

export const Default = args => ({
    Component: Footer,
    args,
});
