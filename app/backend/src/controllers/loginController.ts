import { Request, Response, NextFunction } from 'express';
import { IServiceM } from '../interfaces/iLogin';
import Token from '../helpers/jwt';

require('express-async-errors');

class loginController {
  constructor(private service: IServiceM) {
    this.service = service;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await this.service.login(email, password, next);
    const myToken = await Token.creatingToken(user);
    res.status(200).json({ token: myToken });
  };
}

export default loginController;
