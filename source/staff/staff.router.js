import express from 'express';

import {
    validatorMiddleware,
    limiterMiddleware,
    verifyRolesMiddleware,
    authenticateMiddleware,
} from '../middlewares';
import { createStaffDto } from './create-staff.dto';
import { StaffController } from './staff.controller';

const staffRouter = express.Router();
const staffController = new StaffController();
const authMiddlewares = [
    authenticateMiddleware,
    verifyRolesMiddleware(['Staff']),
];

staffRouter.post(
    '/',
    [limiterMiddleware(5, 60 * 1000), validatorMiddleware(createStaffDto)],
    staffController.create
);

staffRouter.get('/', authMiddlewares, staffController.getAll);

export { staffRouter };
