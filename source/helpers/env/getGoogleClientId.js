import { ValidationError } from '../errors';

const getGoogleClientID = () => {
    const { GOOGLE_CLIENT_ID } = process.env;

    if (!GOOGLE_CLIENT_ID) {
        throw new ValidationError(
            'Environment variable GOOGLE_CLIENT_ID should be specified'
        );
    }

    if (typeof GOOGLE_CLIENT_ID !== 'string') {
        throw new ValidationError(
            'Environment variable GOOGLE_CLIENT_ID should be a string'
        );
    }

    return GOOGLE_CLIENT_ID;
};

export { getGoogleClientID };
