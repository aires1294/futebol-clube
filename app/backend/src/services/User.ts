import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';
import ValidationToken from '../Authentication/token';

// interface UsersData {
//   id: number;
//   userName: string;
//   role: string;
//   email: string;
//   password: string;
// }
interface UsersData {
  status: number | null;
  message: string;
  token?: string;
}

// const users = new Users();

export default class UsersService {
  // private _users = Users;

  static async login(email: string, password: string): Promise<UsersData> {
    const result = await Users.findOne({ where: { email } });
    if (!result) {
      return { status: 401, message: 'Invalid email or password' };
    }
    const verifyPassword = bcrypt.compareSync(password, result.password);
    if (!verifyPassword) {
      return { status: 401, message: 'Invalid email or password' };
    }

    const token = new ValidationToken().createToken(result.dataValues);
    return { status: null, message: token };
  }
}
