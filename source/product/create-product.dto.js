const createProductDto = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        price: {
            type: 'number',
            minimum: 1,
        },
        discount: {
            type: 'number',
            minimum: 0,
            maximum: 50,
        },
        total: {
            type: 'number',
            minimum: 0,
            maximum: 100,
        },
    },
    required: ['title', 'description', 'price', 'discount', 'total'],
    additionalProperties: false,
};

export { createProductDto };
