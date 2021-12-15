import dg from 'debug';

import { OrderService } from './order.service';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

const debug = dg('controller:order');

class OrderController {
    constructor() {
        this.orderService = new OrderService();
        this.userService = new UserService();
        this.productService = new ProductService();
    }

    create = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);

            await this.userService.getById(req.body.uid);

            const product = await this.productService.getById(req.body.pid);

            if (product.total === 0) {
                throw new Error('Товар закончился');
            }

            if (req.body.count > product.total) {
                throw new Error(
                    'Выбранное кол-во товара превышает кол-во на складе'
                );
            }

            await this.productService.updateByHash(product.hash, {
                ...product.toObject(),
                total: product.total - req.body.count,
            });

            const result = await this.orderService.create(req.body);

            return res.status(201).json({ data: { hash: result.hash } });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getAll = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);

            let result = null;

            if (req.session.user.__t === 'Staff') {
                result = await this.orderService.getAll();
            }

            if (req.session.user.__t === 'customers') {
                result = await this.orderService.getAllByUserId(
                    req.session.user._id
                );
            }

            return res.status(200).json({ data: result });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getByHash = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const { hash } = req.params;
            const result = await this.orderService.getByHash(hash);

            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    updateByHash = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const { hash } = req.params;
            const result = await this.orderService.updateByHash(hash, req.body);

            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    deleteByHash = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const { hash } = req.params;
            await this.orderService.deleteByHash(hash);

            return res.sendStatus(204);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

export { OrderController };
