import Toggle from './Toggle.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
    title: 'Common/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        checked: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the toggle is checked. Value is reactive.',
            table: { defaultValue: { summary: false } },
        },
        disabled: {
            type: { name: 'boolean', required: false },
            control: 'boolean',
            description: 'If the toggle is disabled.',
            table: { defaultValue: { summary: false } },
        },
        'on:toggle': {
            action: 'on:toggle',
            description: 'Event callback when the toggle state is changed.',
            type: { name: 'function', required: false },
            table: { defaultValue: { summary: 'null' } },
        },
    },
};

const Template = args => ({
    props: args,
    on: {
        toggle: args['on:toggle'],
    },
});

export const Default = Template.bind({});
Default.play = async ({ args, canvasElement }) => {
    // Preparation
    const canvas = within(canvasElement);
    const toggle = () => userEvent.click(canvas.getByRole('checkbox', { hidden: true }));
    const getMockResult = () => args['on:toggle']?.mock?.calls?.[0]?.[0]?.detail?.target?.checked;
    // Activate toggle
    await toggle();
    await expect(args['on:toggle']).toBeCalledTimes(1);
    await expect(getMockResult()).toBe(true);
    // Deactivate toggle
    await toggle();
    await expect(args['on:toggle']).toBeCalledTimes(2);
    await expect(getMockResult()).toBe(false);
};

export const Checked = Template.bind({});
Checked.args = {
    checked: true,
}

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
}
