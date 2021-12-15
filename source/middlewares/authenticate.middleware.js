// Instruments
import { NotFoundError } from '../helpers/errors';

export const authenticateMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return next(new NotFoundError('cookie not found', 401));
    }

    const { emails, __t: role, hash } = req.session.user;

    if (
        role === 'customers' &&
        hash !== req.params.hash &&
        req.baseUrl === '/api/v1/customers'
    ) {
        return next(
            new NotFoundError('you do not have access to this profile', 403)
        );
    }

    if (emails) {
        return next();
    }

    res.status(401).json({
        message: 'authentication credentials are not valid',
    });
};
