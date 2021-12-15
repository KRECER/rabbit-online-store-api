import { CustomerModel } from './customer.model';

class CustomerService {
    async getAll() {
        const result = await CustomerModel.find({}).lean();

        return result;
    }

    async getByHash(hash) {
        const result = await CustomerModel.findOne({ hash }).lean();

        if (!result) {
            throw new Error('customer not found');
        }

        return result;
    }

    async updateByHash(hash, dto) {
        const result = await CustomerModel.findOne({ hash });

        if (!result) {
            throw new Error('customer not found');
        }

        result.name.first = dto.name.first;
        result.name.last = dto.name.last;

        result.emails = this._addOrRemoveObjInArray(
            result.emails,
            { actionType: dto.emails.action, target: 'email' },
            dto.emails
        );

        result.phones = this._addOrRemoveObjInArray(
            result.phones,
            { actionType: dto.phones.action, target: 'phone' },
            dto.phones
        );

        await result.save();

        return result;
    }

    _addOrRemoveObjInArray(arr, options, obj) {
        const result = [...arr];
        const idx = result.findIndex(
            (it) => it[options.target] === obj[options.target]
        );

        if (options.actionType === 'add') {
            if (idx > -1) {
                throw new Error(
                    `${options.target}: ${obj[options.target]} already exists`
                );
            }

            result.push(obj);
            obj.isPrimary = false;
        }

        if (options.actionType === 'remove') {
            if (idx === -1) {
                throw new Error(
                    `${options.target}: ${obj[options.target]} not found`
                );
            }

            result.splice(idx, 1);
        }

        return result;
    }

    async deleteByHash(hash) {
        const result = await CustomerModel.findOneAndDelete({ hash });

        if (!result) {
            throw new Error('customer not found');
        }

        return result;
    }
}

export { CustomerService };
