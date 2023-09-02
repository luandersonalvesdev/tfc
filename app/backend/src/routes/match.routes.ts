import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchController = new MatchController();

router.get(
  '/',
  (req: Request, res: Response) => matchController.getAll(req, res),
);

export default router;
