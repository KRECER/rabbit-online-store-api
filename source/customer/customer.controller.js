import dg from 'debug';
import { UserService } from '../user/user.service';
import { CustomerModel } from './customer.model';
import { CustomerService } from './customer.service';

const debug = dg('controller:customer');

class CustomerController {
    constructor() {
        this.userService = new UserService();
        this.customerService = new CustomerService();
    }

    create = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const customerModel = new CustomerModel();
            const customer = await this.userService.create(
                customerModel,
                req.body
            );
            req.session.user = customer;
            res.status(201).json({ data: { hash: customer.hash } });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getAll = async (req, res) => {
        try {
            const result = await this.customerService.getAll();
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getByHash = async (req, res) => {
        try {
            const result = await this.customerService.getByHash(
                req.params.hash
            );
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    updateByHash = async (req, res) => {
        try {
            const result = await this.customerService.updateByHash(
                req.params.hash,
                req.body
            );
            req.session.user.hash = result.hash;
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    deleteByHash = async (req, res) => {
        try {
            await this.customerService.deleteByHash(req.params.hash);
            res.sendStatus(204);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

export { CustomerController };
