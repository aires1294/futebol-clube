import { Request, Response } from 'express';
// import ValidationToken from '../Authentication/token';
import UsersService from '../services/User';

// const validationToken = new ValidationToken();

export default class UsersController {
  static async login(req: Request, res: Response): Promise<Response | void> {
    const { email, password } = req.body;
    const { status, message } = await UsersService.login(email, password);
    if (status) {
      return res.status(status).json({ message });
    }
    const token = message;
    return res.status(200).json({ token });
  }
}

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     const { dataValues: { id } } = await userService.login(email, password);
//     // console.log('aquiiii agora', user);
//     const token = createToken(id);

//    return res.status(200).json({ token });
// };
