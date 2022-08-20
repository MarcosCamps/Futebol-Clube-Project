import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { iLogin } from '../interfaces/iLogin';
import ThrowError from '../middleware/ThrowError';

const secret = process.env.JWT_SECRET || 'secret';
const errMessage = 'Token must be a valid token';

export default class Token {
  static async creatingToken(body: iLogin) {
    const token = await jwt.sign(body, secret);
    return token;
  }

  static rToken(token:string) {
    const isValid = jwt.verify(token, secret);
    if (!isValid) throw new ThrowError(401, errMessage);
    return isValid;
  }
}
