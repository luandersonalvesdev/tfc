import newMatchSchema from '../validations/newMatchSchema';
import IMatch, { INewMatch, INewScoreboard } from '../Interfaces/Match';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import scoreboardSchema from '../validations/scoreboardSchema';
import TeamModel from '../models/TeamModel';

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

  public async addNewMatch(newMatch: INewMatch): Promise<ServiceResponse<IMatch>> {
    const { error } = newMatchSchema.validate(newMatch);
    if (error) return { status: 'BAD_REQUEST', data: { message: error.message } };
    const { homeTeamId, awayTeamId } = newMatch;
    if (homeTeamId === awayTeamId) {
      return { status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const promiseTeams = await Promise.all([homeTeamId, awayTeamId].map((teamId) => {
      const teamModel = new TeamModel();
      return teamModel.getById(teamId.toString());
    }));
    if (promiseTeams.some((team) => !team)) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const response = await this.matchModel.addNewMatch(newMatch);
    const newMatchData = { ...newMatch, id: response.dataValues.id, inProgress: true };
    return { status: 'CREATED', data: newMatchData };
  }
}
