import { OrderModel } from './order.model';
import { CustomerModel } from '../customer/customer.model';

class OrderService {
    _transformResponse(data) {
        return {
            data,
        };
    }

    async create(dto) {
        const orderModel = new OrderModel();
        Object.assign(orderModel, dto);
        const order = await await orderModel.save();

        return order;
    }

    async getAll() {
        const result = await OrderModel.find({})
            .select('-_id -__v -hash -created -modified')
            .populate(
                'uid pid',
                '-_id -__v -__t -hash -created -modified -emails._id -emails.hash -phones._id -phones.hash'
            )
            .lean();

        return result.map((it) => ({ customer: it.uid, product: it.pid }));
    }

    async getAllByUserId(id) {
        const result = await OrderModel.find(
            { uid: id },
            '-_id -__v -hash -created -modified'
        )
            .populate(
                'uid pid',
                '-_id -__v -__t -hash -created -modified -emails._id -emails.hash -phones._id -phones.hash'
            )
            .lean();

        return result.map((it) => ({ customer: it.uid, product: it.pid }));
    }

    async getByHash(hash) {
        const result = await OrderModel.findOne({ hash })
            .select('-_id -__v -hash -created -modified')
            .lean();

        if (!result) {
            throw new Error('order not found');
        }

        return this._transformResponse(result);
    }

    async updateByHash(hash, dto) {
        const result = await OrderModel.findOneAndUpdate({ hash }, dto, {
            new: true,
        })
            .select('-_id -__v -hash -created -modified')
            .lean();

        if (!result) {
            throw new Error('order not found');
        }

        return this._transformResponse(result);
    }

    async deleteByHash(hash) {
        const result = await OrderModel.findOneAndDelete({ hash })
            .select('-_id -__v -hash -created -modified')
            .lean();

        if (!result) {
            throw new Error('order not found');
        }

        return result;
    }
}

export { OrderService };
