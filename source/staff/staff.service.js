import { StaffModel } from './staff.model';

class StaffService {
    async getAll() {
        const result = await StaffModel.find({}).lean();

        return result;
    }
}

export { StaffService };
