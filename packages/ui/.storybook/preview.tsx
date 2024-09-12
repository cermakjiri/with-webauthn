import React from 'react';
import { Preview } from '@storybook/react';

import { ThemeProvider } from '../src/styles/components/ThemeProvider';

import './globals.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
    },
    decorators: [
        Story => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
};

export default preview;
