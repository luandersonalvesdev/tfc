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

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => res.status(200).json(req.body.payload.data),
);

export default router;
