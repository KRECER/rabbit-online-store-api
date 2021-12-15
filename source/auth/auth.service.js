import bcryptjs from 'bcryptjs';

import { UserModel } from '../user/user.model';

class AuthService {
    async login(header) {
        const hash = header.split(' ')[1];
        const [email, plainPassword] = Buffer.from(hash, 'base64')
            .toString()
            .split(':');

        const user = await UserModel.findOne(
            { 'emails.email': email },
            'password hash emails'
        ).lean();

        if (!user) {
            throw new Error('authentication credentials are not valid');
        }

        const isPasswordCorrect = await bcryptjs.compare(
            plainPassword,
            user.password
        );

        if (!isPasswordCorrect) {
            throw new Error('authentication credentials are not valid');
        }

        return user;
    }
}

export { AuthService };
