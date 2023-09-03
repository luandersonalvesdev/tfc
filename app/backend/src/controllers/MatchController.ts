import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAll(req: Request, res: Response) {
    let { inProgress } = req.query;
    if (!inProgress) inProgress = '';
    const { status, data } = await this.matchService.getAll(inProgress as string);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateScoreboard(req: Request, res: Response) {
    const { id } = req.params;
    const { payload, ...newScoreboard } = req.body;
    const { status, data } = await this.matchService.updateScoreboard(newScoreboard, Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async addNewMatch(req: Request, res: Response) {
    const { payload, ...newMatch } = req.body;
    const { status, data } = await this.matchService.addNewMatch(newMatch);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
