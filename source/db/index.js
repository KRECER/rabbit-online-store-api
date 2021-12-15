// Core
import mongoose from 'mongoose';
import dg from 'debug';

// Instruments
import { getDbName, getDbUrl } from '../helpers';

// Plugins
import { addHashPlugin } from '../plugins';

const debug = dg('db');
const DB_NAME = getDbName();
const DB_URL = getDbUrl();

const mongooseOptions = {
    promiseLibrary: global.Promise,
    poolSize: 10,
    keepAlive: 30000,
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,

    // autoIndex: false,
};

const connection = mongoose.connect(DB_URL, mongooseOptions);

mongoose.plugin(addHashPlugin, { index: true });

connection
    .then(() => {
        debug(`DB '${DB_NAME}' connected`);
    })
    .catch(({ message }) => {
        debug(`DB ${DB_NAME} connectionError: ${message}`);
    });
