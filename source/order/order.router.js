import express from 'express';

import { OrderController } from './order.controller';
import { validatorMiddleware, authenticateMiddleware } from '../middlewares';
import { createOrderDto } from './create-order.dto';

const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter
    .route('/')
    .post(
        [authenticateMiddleware, validatorMiddleware(createOrderDto)],
        orderController.create
    )
    .get([authenticateMiddleware], orderController.getAll);

orderRouter
    .route('/:hash')
    .get([authenticateMiddleware], orderController.getByHash)
    .put(
        [authenticateMiddleware, validatorMiddleware(createOrderDto)],
        orderController.updateByHash
    )
    .delete(authenticateMiddleware, orderController.deleteByHash);

export { orderRouter };
