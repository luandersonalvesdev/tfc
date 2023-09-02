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
}