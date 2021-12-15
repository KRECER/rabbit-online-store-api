import { ProductModel } from './product.model';

class ProductService {
    _transformResponse(data) {
        return {
            data,
        };
    }

    async create(dto) {
        const product = new ProductModel();
        Object.assign(product, dto);
        const productObj = await (await product.save()).toObject();

        delete productObj._id;
        delete productObj.__v;
        delete productObj.hash;
        delete productObj.created;
        delete productObj.modified;

        return productObj;
    }

    async getAll() {
        const result = await ProductModel.find({})
            .select('-_id -__v -hash -created -modified')
            .lean();

        return this._transformResponse(result);
    }

    async getById(id) {
        const result = await ProductModel.findById(id);

        if (!result) {
            throw new Error('product not found');
        }

        return result;
    }

    async getByHash(hash) {
        const result = await ProductModel.findOne({ hash })
            .select('-_id -__v -hash -created -modified')
            .lean();

        if (!result) {
            throw new Error('product not found');
        }

        return this._transformResponse(result);
    }

    async updateByHash(hash, dto) {
        const result = await ProductModel.findOneAndUpdate({ hash }, dto, {
            new: true,
        })
            .select('-_id -__v -hash -created -modified')
            .lean();

        if (!result) {
            throw new Error('product not found');
        }

        return this._transformResponse(result);
    }

    async deleteByHash(hash) {
        const result = await ProductModel.findOneAndDelete({ hash })
            .select('-_id -__v -hash -created -modified')
            .lean();

        if (!result) {
            throw new Error('product not found');
        }

        return result;
    }
}

export { ProductService };
