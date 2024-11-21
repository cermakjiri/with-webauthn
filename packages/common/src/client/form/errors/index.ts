export const formError = {
    required: 'Required',
    email: 'Please enter valid e-mail address.',
    password: {
        length: 'Inserted password must be at least 10 chars of length.',
        casing: 'Inserted password must contain at least one capital letter.',
        special: 'Inserted password must contain at least 1 special character.',
        numerical: 'Inserted password must contain at least 1 number.',
    },
} as const;
