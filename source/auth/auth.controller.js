import dg from 'debug';

import { AuthService } from './auth.service';

const debug = dg('controller:auth');

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    login = async (req, res) => {
        try {
            debug(`${req.method} - ${req.originalUrl}`);
            const header = req.get('authorization');
            req.session.user = await this.authService.login(header);
            res.sendStatus(204);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    };

    logout = async (req, res) => {
        try {
            await req.session.destroy();
            res.sendStatus(200);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

export { AuthController };
