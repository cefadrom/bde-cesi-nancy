export const parameters = {
    actions: { argTypesRegex: '^on:[a-z]' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'Light',
        values: [
            { name: 'Light', value: 'var(--white)' },
            { name: 'Dark', value: 'var(--black)' },
            { name: 'Image', value: 'url(students/students-1440.jpg)' },
        ],
    }
};