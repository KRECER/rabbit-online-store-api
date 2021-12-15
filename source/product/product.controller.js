import dg from 'debug';

import { ProductService } from './product.service';

const debug = dg('controller:product');

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    create = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const result = await this.productService.create(req.body);

            return res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getAll = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const result = await this.productService.getAll();

            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getByHash = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const { hash } = req.params;
            const result = await this.productService.getByHash(hash);

            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    updateByHash = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const { hash } = req.params;
            const result = await this.productService.updateByHash(
                hash,
                req.body
            );

            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    deleteByHash = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const { hash } = req.params;
            await this.productService.deleteByHash(hash);

            return res.sendStatus(204);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

export { ProductController };
