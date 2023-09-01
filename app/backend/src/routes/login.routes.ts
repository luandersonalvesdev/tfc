import { Request, Response, Router } from 'express';
import Validations from '../middlewares/Validations';
import LoginController from '../controllers/LoginController';

const router = Router();

const loginController = new LoginController();

router.post(
  '/',
  Validations.validateLoginData,
  (req: Request, res: Response) => loginController.doLogin(req, res),
);

export default router;
