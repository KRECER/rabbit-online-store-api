import { createUserDto } from '../user/create-user.dto';

const createCustomerDto = {
    type: 'object',
    properties: {
        ...createUserDto.properties,
        country: {
            type: 'string',
        },
        city: {
            type: 'string',
        },
    },
    required: [...createUserDto.required, 'country', 'city'],
    additionalProperties: false,
};

export { createCustomerDto };
