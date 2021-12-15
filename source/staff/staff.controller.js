import dg from 'debug';
import { UserService } from '../user/user.service';

import { StaffModel } from './staff.model';
import { StaffService } from './staff.service';

const debug = dg('controller:staff');

class StaffController {
    constructor() {
        this.userService = new UserService();
        this.staffService = new StaffService();
    }

    create = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const stuffModel = new StaffModel({});
            const staff = await this.userService.create(stuffModel, req.body);
            req.session.user = staff;
            res.status(201).json({ data: { hash: staff.hash } });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    getAll = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const result = await this.staffService.getAll();
            res.status(200).json({ data: result });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

export { StaffController };
