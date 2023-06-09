// import UsersService from 'src/services/User';
// import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
// import UsersController from '../controllers/User';

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
const secret = process.env.JWT_SECRET || 'flamengo';

const validateAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const verifyToken = jwt.verify(authorization, secret);
    // -----------------------------------------------------------------------------------
    // res.locals => LOCAL PARA ARMAZENAR informações, ao colocar no body pode dar problema
    // -----------------------------------------------------------------------------------
    res.locals.verifyToken = verifyToken;
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export { validateLoginBody, validateEmail, validatePassword, validateAuth };
