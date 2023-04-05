import { Request, Response } from 'express';
import UsersService from '../services/User';

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

  static async getRole(req: Request, res: Response): Promise<Response | void> {
    // -----------------------------------------------------------------------------------
    // res.locals => LOCAL PARA ARMAZENAR informações, ao colocar no body pode dar problema
    // -----------------------------------------------------------------------------------
    const userRole = res.locals.verifyToken.data.id.role;
    return res.status(200).json({ role: userRole });
  }
}
