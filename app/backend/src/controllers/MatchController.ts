import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAll(_req: Request, res: Response) {
    const { status, data } = await this.matchService.getAll();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
