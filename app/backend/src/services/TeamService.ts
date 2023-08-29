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

  public async getById(id: string): Promise<ServiceResponse<ITeam>> {
    const teamById = await this.teamModel.getById(id);
    if (!teamById) return { status: 'NOT_FOUND', data: { message: 'team not found' } };
    return { status: 'SUCCESSFUL', data: teamById };
  }
}
