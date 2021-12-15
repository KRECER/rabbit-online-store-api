import express from 'express';

import { ProductController } from './product.controller';
import {
    validatorMiddleware,
    verifyRolesMiddleware,
    authenticateMiddleware,
} from '../middlewares';
import { createProductDto } from './create-product.dto';

const productRouter = express.Router();
const productController = new ProductController();
const staffMiddlewares = [
    authenticateMiddleware,
    verifyRolesMiddleware(['Staff']),
];

productRouter
    .route('/')
    .post(
        [...staffMiddlewares, validatorMiddleware(createProductDto)],
        productController.create
    )
    .get(productController.getAll);

productRouter
    .route('/:hash')
    .get(productController.getByHash)
    .put(
        [...staffMiddlewares, validatorMiddleware(createProductDto)],
        productController.updateByHash
    )
    .delete(staffMiddlewares, productController.deleteByHash);

export { productRouter };
