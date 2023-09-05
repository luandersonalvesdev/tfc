import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getLeaderboard(req, res),
);

export default router;
