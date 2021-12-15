import mongoose from 'mongoose';

const productSchemaOptions = {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
};

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        discount: {
            type: Number,
        },
        total: {
            type: Number,
        },
    },
    productSchemaOptions
);

const ProductModel = mongoose.model('products', productSchema);

export { ProductModel };
