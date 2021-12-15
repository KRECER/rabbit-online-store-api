const createUserDto = {
    type: 'object',
    properties: {
        name: {
            first: { type: 'string' },
            last: { type: 'string' },
        },
        email: {
            type: 'string',
            format: 'email',
        },
        phone: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
    required: ['name', 'email', 'phone', 'password'],
    additionalProperties: false,
};

export { createUserDto };
