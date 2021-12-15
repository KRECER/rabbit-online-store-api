import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    isPrimary: {
        type: Boolean,
        default: true,
    },
});

const phoneSchema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    isPrimary: {
        type: Boolean,
        default: true,
    },
});

const schemaOptions = {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified',
    },
};

const userSchema = new mongoose.Schema(
    {
        name: {
            first: {
                type: String,
                required: true,
            },
            last: {
                type: String,
                required: true,
            },
        },
        emails: [emailSchema],
        phones: [phoneSchema],
        password: {
            type: String,
            select: false,
        },
    },
    schemaOptions
);

userSchema.index({ 'name.first': 'text', 'name.last': 'text' });

userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcryptjs.hash(this.password, 10);

        return next();
    } catch (error) {
        return next(error);
    }
});

export const UserModel = mongoose.model('users', userSchema);
