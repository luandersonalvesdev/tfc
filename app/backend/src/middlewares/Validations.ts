import { NextFunction, Response, Request } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { getPayload } from '../auth/jwtAuth';

class Validations {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token not found' });
    }
    const payload = getPayload(token);
    req.body.payload = payload;
    next();
  }

  static validateLoginData(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(mapStatusHTTP('BAD_REQUEST'))
        .json({ message: 'All fields must be filled' });
    }
    next();
  }
}

export default Validations;
