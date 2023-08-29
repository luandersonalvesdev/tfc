import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeam from '../Interfaces/Team';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) {}

  public async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.getAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
