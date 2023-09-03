import IMatch, { INewScoreboard } from '../Interfaces/Match';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import scoreboardSchema from '../validations/scoreboardSchema';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  public async getAll(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    const allTeams = await this.matchModel.getAll(inProgress);
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async finishMatch(matchId: number): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchModel.getById(matchId);
    if (!match) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    await this.matchModel.finishMatch(matchId);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateScoreboard(
    newScoreboard: INewScoreboard,
    matchId: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const { error } = scoreboardSchema.validate(newScoreboard);
    if (error) return { status: 'BAD_REQUEST', data: { message: error.message } };
    await this.matchModel.updateScoreboard(newScoreboard, matchId);
    return { status: 'SUCCESSFUL', data: { message: 'Scoreboard updated' } };
  }
}
