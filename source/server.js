// Core
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import dg from 'debug';
import helmet from 'helmet';

// Instruments
import { getPassword, NotFoundError } from './helpers';

// Initialize DB connection
import './db';

// Routers
import { authRouter } from './auth/auth.router';
import { staffRouter } from './staff/staff.router';
import { customerRouter } from './customer/customer.router';
import { productRouter } from './product/product.router';
import { orderRouter } from './order/order.router';

const app = express();
const debug = dg('server:init');
const MongoStore = connectMongo(session);

const sessionOptions = {
    key: 'user',
    secret: getPassword(),
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    },
};

// change cookie max age for development
if (process.env.NODE_ENV === 'development') {
    sessionOptions.cookie.maxAge = 8 * 60 * 60 * 1000; // 8 hours
}

// secure cookie for production
if (process.env.NODE_ENV === 'production') {
    sessionOptions.cookie.secure = true;
}

app.use(
    bodyParser.json({
        limit: '5kb',
    })
);
app.use(session(sessionOptions));
app.use(helmet());

// Router middlewares
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/staff', staffRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        const body =
            req.method === 'GET'
                ? 'Body not supported for GET'
                : JSON.stringify(req.body, null, 2);

        debug(`${req.method}\n${body}`);
        next();
    });
}

app.use('*', (req, res, next) => {
    const error = new NotFoundError(
        `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
        404
    );
    next(error);
});

if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        debug(`Error: ${errorMessage}`);

        const status = statusCode ? statusCode : 500;
        res.status(status).json({ message: message });
    });
}

export { app };
