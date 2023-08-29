// import TeamService from './services/TeamService.ts';
import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async getAll(req: Request, res: Response) {
    const { status, data } = await this.teamService.getAll();
    if (status !== 'SUCCESSFUL') return res.status(mapStatusHTTP(status)).json(data);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
