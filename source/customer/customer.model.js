import { Schema } from 'mongoose';
import { UserModel } from '../user/user.model';

const customerSchema = new Schema({
    city: {
        type: String,
        index: true,
    },
    country: {
        type: String,
        index: true,
    },
});

customerSchema.index({ city: 'text', country: 'text' });

const CustomerModel = UserModel.discriminator('customers', customerSchema);

export { CustomerModel };
