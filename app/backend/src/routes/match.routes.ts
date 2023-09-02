import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const router = Router();

const matchController = new MatchController();

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAll(req, res),
);

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default router;
