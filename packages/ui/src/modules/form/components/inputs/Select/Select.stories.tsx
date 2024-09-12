import type { Meta, StoryObj } from '@storybook/react';

import { logger } from '@workspace/logger';

import { Select } from './Select';

const meta = {
    title: 'UI/Form/Select',
    component: Select,
    argTypes: {
        options: {
            control: { type: 'object' },
        },
        defaultValue: {
            control: { type: 'text' },
        },
        error: {
            control: { type: 'boolean' },
        },
        open: {
            control: { type: 'boolean' },
        },
        fullWidth: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {
    args: {
        options: [
            { value: 'Member', label: 'Member' },
            { value: 'Admin', label: 'Admin' },
            { value: 'Tvuj strejda', label: 'Tvuj strejda' },
            { value: 'Host', label: 'Host' },
            { value: 'nevim', label: 'nevim' },
        ],
        defaultValue: 'Admin',
        onChange: (e: any) => {
            logger.info(e);
        },
        error: false,
        open: false,
        fullWidth: false,
    },

    render: args => <Select {...args} />,
};
