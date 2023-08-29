import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

const teamController = new TeamController();

router.get('/', (req: Request, res: Response) => teamController.getAll(req, res));

export default router;
