import { v4 as uuidv4 } from 'uuid';

const addHashPlugin = (schema, options) => {
    schema.add({ hash: String });

    schema.pre('save', function (next) {
        this.hash = uuidv4();
        next();
    });

    if ((options, options.index)) {
        schema.path('hash').index(true);
    }
};

export { addHashPlugin };
