import { useState } from 'react';
import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './TextInput';

type Story = StoryObj<typeof TextInput>;

const meta: Meta<typeof TextInput> = {
    title: 'UI/Form/TextInput',
    component: TextInput,
    argTypes: {
        disabled: {
            control: { type: 'boolean' },
        },
        error: {
            control: { type: 'boolean' },
        },
        helperText: {
            control: { type: 'text' },
        },
        label: {
            control: { type: 'text' },
        },
        placeholder: {
            control: { type: 'text' },
        },
        focused: {
            control: { type: 'boolean' },
        },
        fullWidth: {
            control: { type: 'boolean' },
        },
        defaultValue: {
            control: { type: 'text' },
        },
    },
};

export default meta;

const Template = (args: Story['args']) => {
    const [value, setValue] = useState<string | null>(null);

    return (
        <Box p={2.5}>
            <TextInput
                {...args}
                value={value ?? args?.value}
                onChange={e => {
                    setValue(e.target.value);
                    args?.onChange?.(e);
                }}
            />
        </Box>
    );
};

export const Default: Story = {
    render: Template,

    args: {
        label: 'First name',
        placeholder: undefined,
        multiline: true,
        helperText: '',
        disabled: false,
        error: false,
        fullWidth: false,
        value: 'hello',
    },
};

export const Disabled: Story = {
    render: Template,

    args: {
        label: 'First name',
        defaultValue: 'John Doe',
        disabled: true,
    },
};

export const Error: Story = {
    render: Template,

    args: {
        label: 'First name',
        error: true,
        helperText: 'Required',
    },
};
