// Core
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import bodyParser from 'body-parser';
import dg from 'debug';
import passport from 'passport';
import helmet from 'helmet';

// Instruments
import { getPassword, NotFoundError } from './helpers';
import './libs/passport.lib';

// Initialize DB connection
import './db';

// Ititialize Telegram Client
import './telegram.client';

// Routers
import { authRouter } from './auth/auth.router';
import { staffRouter } from './staff/staff.router';
import { customerRouter } from './customer/customer.router';
import { productRouter } from './product/product.router';
import { orderRouter } from './order/order.router';

// Models
import { UserModel } from './user/user.model';

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
app.use(passport.initialize());
app.use(passport.session());

// Router middlewares
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/staff', staffRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);

app.get('/', (req, res) => {
    res.type('.html');
    res.send(
        `${
            !req.session?.passport?.user
                ? '<a href="/registration/google">google</a>'
                : `Hi ${req.session.passport.user.emails[0].value}`
        }`
    );
});

app.get('/registration/google', (req, res) => {
    passport.authenticate('google', {
        scope: 'email',
    })(req, res);
});

app.get('/registration/google/callback', (req, res) => {
    passport.authenticate('google', { successRedirect: '/' })(req, res);
});

app.get('/auth-success', async (req, res, next) => {
    try {
        if (req.session?.passport?.user) {
            const userObj = {};
            userObj.emails = {
                email: req.session.passport.user.emails[0].value,
                isPrimary: true,
            };
            userObj.avatar = req.session.passport.user.photos[0].value;
            userObj.socialId = req.session.passport.user.id;
            userObj.provider = req.session.passport.user.provider;
            userObj.name = { first: 'test', last: 'test123' };

            req.session.userId = await UserModel.findOne(
                { socialId: userObj.socialId },
                { _id: 1 }
            ).lean();
            console.log('req.session.userId', req.session.userId);
            req.session.userId =
                req.session.userId || (await UserModel.create(userObj))._id;

            res.redirect('/profile');
            console.log('req.session.userId', req.session.userId);

            return;
        }

        next('authentication error');
    } catch (error) {
        next(error.message);
    }
});

app.get('/api/v1/auth/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

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
