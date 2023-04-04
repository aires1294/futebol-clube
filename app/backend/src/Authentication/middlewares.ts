// import UsersService from 'src/services/User';
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
    return res.status(400)
      .json({ message: '"email" must be a valid email' });
  }
  next();
};

export { validateLoginBody, validateEmail };
