import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        uid: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'customers',
            required: true,
        },
        pid: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'products',
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        comment: String,
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    }
);

const OrderModel = mongoose.model('orders', orderSchema);

export { OrderModel };
