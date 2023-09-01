import { NextFunction, Response, Request } from 'express';

class Validations {
  static validateLoginData(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }
}

export default Validations;
