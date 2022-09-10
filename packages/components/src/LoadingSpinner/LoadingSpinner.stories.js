import LoadingSpinner from './LoadingSpinner.svelte';

export default {
    title: 'Common/LoadingSpinner',
    component: LoadingSpinner,
    parameters: {
        layout: 'centered',
    },
};

export const Default = () => ({
    Component: LoadingSpinner,
});
