import { ValidationError } from '../errors';

const getGoogleClientSecret = () => {
    const { GOOGLE_CLIENT_SECRET } = process.env;

    if (!GOOGLE_CLIENT_SECRET) {
        throw new ValidationError(
            'Environment variable GOOGLE_CLIENT_SECRET should be specified'
        );
    }

    if (typeof GOOGLE_CLIENT_SECRET !== 'string') {
        throw new ValidationError(
            'Environment variable GOOGLE_CLIENT_SECRET should be string'
        );
    }

    return GOOGLE_CLIENT_SECRET;
};

export { getGoogleClientSecret };
