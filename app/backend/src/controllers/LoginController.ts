import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public async doLogin(req: Request, res: Response) {
    const { status, data } = await this.loginService.doLogin(req.body);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
