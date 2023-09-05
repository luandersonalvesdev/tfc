// import TeamService from './services/TeamService.ts';
import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getLeaderboard(req: Request, res: Response) {
    const homeOrAway = req.url.replace('/', '');
    const { status, data } = await this.leaderboardService.getLeaderboard(homeOrAway);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
