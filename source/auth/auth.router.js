import express from 'express';
import { AuthController } from './auth.controller';
import { authenticateMiddleware } from '../middlewares';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/login', authController.login);
authRouter.get('/logout', [authenticateMiddleware], authController.logout);

export { authRouter };
