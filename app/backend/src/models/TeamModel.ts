import ITeam from '../Interfaces/Team';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel {
  private model = SequelizeTeam;

  async getAll(): Promise<ITeam[]> {
    const dBResponse = await this.model.findAll();
    return dBResponse;
  }
}
