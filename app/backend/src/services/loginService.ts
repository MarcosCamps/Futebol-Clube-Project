import * as crypt from 'bcryptjs';
import { NextFunction } from 'express';
import ThrowError from '../middleware/ThrowError';
import userModel from '../database/models/users';
import { IServiceM } from '../interfaces/iLogin';
import { EMAIL_REGEX } from '../helpers/emailRegex';

require('express-async-errors');

const errMessage = 'Incorrect email or password';
const emailErr = 'All fields must be filled';

const validateBody = async (body: any) => {
  const { email, password, next } = body;
  if (!email) return next(new ThrowError(400, emailErr));
  if (!EMAIL_REGEX.test(email) || password.length < 6) {
    return next(new ThrowError(401, errMessage));
  }
  return true;
};

export default class loginService implements IServiceM {
  constructor(private model = userModel) {
    this.model = model;
  }

  public login = async (
    email: string,
    password: string,
    next: NextFunction,
  ): Promise<any> => {
    validateBody({ email, password, next });
    const userExists = await this.model.findOne({
      where: { email },
      raw: true,
    });
    if (!userExists) return next(new ThrowError(401, errMessage));
    const passwordExistis = crypt.compare(password, userExists.password);
    if (!passwordExistis) return next(new ThrowError(401, errMessage));
    return userExists;
  };
}
