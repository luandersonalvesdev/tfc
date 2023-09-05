import LeaderboardModel from '../models/LeaderboardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILeaderboard from '../Interfaces/Leaderboard';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) {}

  public async getLeaderboard(homeOrAway: string): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getLeaderboard(homeOrAway);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
