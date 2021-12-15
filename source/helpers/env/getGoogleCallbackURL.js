import { ValidationError } from '../errors';

const getGoogleCallbackURL = () => {
    const { GOOGLE_CALLBACK_URL } = process.env;

    if (!GOOGLE_CALLBACK_URL) {
        throw new ValidationError(
            'Environment variable GOOGLE_CALLBACK_URL should be specified'
        );
    }

    if (typeof GOOGLE_CALLBACK_URL !== 'string') {
        throw new ValidationError(
            'Environment variable GOOGLE_CALLBACK_URL should be string'
        );
    }

    return GOOGLE_CALLBACK_URL;
};

export { getGoogleCallbackURL };
