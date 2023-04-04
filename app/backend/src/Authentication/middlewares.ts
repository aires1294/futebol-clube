// import UsersService from 'src/services/User';
// import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

const validateLoginBody = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }
  next();
};

const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/g;
  const emailConfirmed = regex.test(email);
  if (!emailConfirmed) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

// const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
//   const { password } = req.body;
//   const verifyPassword = bcrypt.compareSync(password, this.password);
//   if (!verifyPassword) {
//     return { status: 401, message: 'Invalid email or password' };
//   }
// };

const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export { validateLoginBody, validateEmail, validatePassword };
