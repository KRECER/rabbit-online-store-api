import mongoose from 'mongoose';
import { UserModel } from '../user/user.model';

const StaffModel = UserModel.discriminator(
    'Staff',
    new mongoose.Schema(
        {
            role: {
                type: String,
                required: true,
            },
        },
        {
            timestamps: { createdAt: 'created', updatedAt: 'modified' },
        }
    )
);

export { StaffModel };
