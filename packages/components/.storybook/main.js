module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'
    ],
    webpackFinal: async (config) => {
        const svelteLoader = config.module.rules.find((r) => r.loader && r.loader.includes('svelte-loader'));
        svelteLoader.options.preprocess = require('svelte-preprocess')();
        return config;
    },
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        '@hover/storybook-addon-pseudo-states'
    ],
    framework: '@storybook/svelte',
    features: {
        interactionsDebugger: true,
    },
    staticDirs: [
        '../../../web/static',
        '../../../web/src/lib',
    ]
};
