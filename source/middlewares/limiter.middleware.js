import rateLimit from 'express-rate-limit';

export const limiterMiddleware = (numRequest, resetIn) =>
    rateLimit({
        windowMs: resetIn,
        max: numRequest,
        headers: false,
    });
