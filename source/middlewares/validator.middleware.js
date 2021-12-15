// Core
import Ajv from 'ajv';

// Instruments
import { ValidationError } from '../helpers';

const validatorMiddleware = (schema) => (req, res, next) => {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (valid) {
        next();
    } else {
        const errors = validate.errors.map(({ message }) => message).join(', ');
        const body = JSON.stringify(req.body, null, 2);

        next(
            new ValidationError(
                `${req.method}: ${req.originalUrl} [ ${errors} ]\n${body}`
            )
        );
    }
};

export { validatorMiddleware };
