const updateCustomerDto = {
    type: 'object',
    properties: {
        name: {
            type: 'object',
            required: ['first', 'last'],
            properties: {
                first: { type: 'string' },
                last: { type: 'string' },
            },
        },
        emails: {
            type: 'object',
            required: ['email', 'action'],
            properties: {
                email: { type: 'string', format: 'email' },
                action: { type: 'string', enum: ['remove', 'add'] },
            },
        },
        phones: {
            type: 'object',
            required: ['phone', 'action'],
            properties: {
                phone: { type: 'string' },
                action: { type: 'string', enum: ['remove', 'add'] },
            },
        },
        country: {
            type: 'string',
        },
        city: {
            type: 'string',
        },
    },
    required: ['emails', 'phones', 'name'],
    additionalProperties: false,
};

export { updateCustomerDto };
