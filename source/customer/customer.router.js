import express from 'express';
import {
    validatorMiddleware,
    authenticateMiddleware,
    verifyRolesMiddleware,
} from '../middlewares';
import { CustomerController } from './customer.controller';
import { createCustomerDto } from './create-customer.dto';
import { updateCustomerDto } from './update-customer.dto';

const customerRouter = express.Router();
const customerController = new CustomerController();
const guardMiddlewares = [
    authenticateMiddleware,
    verifyRolesMiddleware('Staff'),
];

customerRouter
    .route('/')
    .post([validatorMiddleware(createCustomerDto)], customerController.create)
    .get(guardMiddlewares, customerController.getAll);

customerRouter
    .route('/:hash')
    .get([authenticateMiddleware], customerController.getByHash)
    .put(
        [authenticateMiddleware, validatorMiddleware(updateCustomerDto)],
        customerController.updateByHash
    )
    .delete([authenticateMiddleware], customerController.deleteByHash);

export { customerRouter };
