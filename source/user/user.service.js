import { UserModel } from './user.model';

class UserService {
    async create(model, dto) {
        model.emails.push({ email: dto.email });
        model.phones.push({ phone: dto.phone });
        Object.assign(model, dto);
        await model.save();

        return model.toObject();
    }

    async getById(id) {
        const result = await UserModel.findById(id).lean();

        if (!result) {
            throw new Error('user not found');
        }

        return result;
    }
}

export { UserService };
