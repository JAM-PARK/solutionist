import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwtToken from '../utils/tokenFunctions';
import { getRepository } from 'typeorm';
import { users } from '../database/entity/users';

export const blockUnauthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.cookies.accessToken;

  if (!auth) {
    return res.status(401).send('invalid user');
  }

  const authorized = jwtToken.isAuthorized(auth);

  if (!authorized) {
    return res.status(401).send('invalid user');
  }

  const decoded = JSON.parse(authorized.data);

  res.locals.userInfo = decoded;
  next();
};
export const saveUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.cookies.accessToken;

  if (auth) {
    const authorized = jwtToken.isAuthorized(auth);

    if (authorized) {
      const decoded = JSON.parse(authorized.data);
      res.locals.userInfo = decoded;
    }
  }

  next();
};
