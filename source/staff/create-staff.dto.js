import { createUserDto } from '../user/create-user.dto';

const createStaffDto = {
    type: 'object',
    properties: {
        ...createUserDto.properties,
        role: {
            type: 'string',
        },
        isDisabled: {
            type: 'boolean',
        },
    },
    required: [...createUserDto.required, 'role'],
    additionalProperties: false,
};

export { createStaffDto };
