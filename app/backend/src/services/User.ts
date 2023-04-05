import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';
import ValidationToken from '../Authentication/token';

interface IUser {
  id: number;
  userName: string;
  role: string;
  email: string;
  password: string;
}
interface UsersData {
  status: number | null;
  message: string;
  token?: string;
}

// interface userRole {
//   status: number | null;
//   role: string;
// }

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

  static async getRole(user: IUser): Promise<string | undefined> {
    const { id } = user;
    const userRole = await Users.findOne({ where: { id } });
    return userRole?.role;
  }
}
