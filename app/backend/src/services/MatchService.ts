import IMatch from '../Interfaces/Match';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  public async getAll(): Promise<ServiceResponse<IMatch[]>> {
    const allTeams = await this.matchModel.getAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
