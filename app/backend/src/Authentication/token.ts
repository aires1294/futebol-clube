import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const jwtConfig: object = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
export default class ValidationToken {
  private secret = process.env.JWT_SECRET || 'flamengo';

  createToken(id: number): string {
    const token: string = jwt.sign({ data: { id } }, this.secret, jwtConfig);
    return token;
  }

  validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const verifyToken = jwt.verify(authorization, this.secret);
      res.locals.verifyToken = verifyToken;
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
