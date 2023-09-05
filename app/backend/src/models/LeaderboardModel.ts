import { QueryTypes } from 'sequelize';
import ILeaderboard from '../Interfaces/Leaderboard';
import sequelize from '../database/models';
import {
  leaderboardHomeQuery, leaderboardAwayQuery, leaderboardAllQuery,
} from '../utils/MysqlQueries';

export default class LeaderboardModel {
  constructor(
    private leaderboardTeams: ILeaderboard[] = [],
  ) { }

  async getLeaderboard(homeOrAway: string): Promise<ILeaderboard[]> {
    const query = LeaderboardModel.getQuery(homeOrAway);
    this.leaderboardTeams = await sequelize.query(
      query,
      { type: QueryTypes.SELECT },
    );

    LeaderboardModel.formattedLeaderboard(this.leaderboardTeams);
    LeaderboardModel.sortedLeaderboard(this.leaderboardTeams);

    return this.leaderboardTeams;
  }

  private static formattedLeaderboard = (leaderboardTeams: ILeaderboard[]): void =>
    leaderboardTeams.forEach((e) => {
      e.totalPoints = Number(e.totalPoints);
      e.totalVictories = Number(e.totalVictories);
      e.totalDraws = Number(e.totalDraws);
      e.totalLosses = Number(e.totalLosses);
      e.goalsFavor = Number(e.goalsFavor);
      e.goalsOwn = Number(e.goalsOwn);
      e.goalsBalance = e.goalsFavor - e.goalsOwn;
      e.efficiency = +((e.totalPoints / (e.totalGames * 3)) * 100).toFixed(2);
    });

  private static sortedLeaderboard = (leaderboardTeams: ILeaderboard[]) =>
    leaderboardTeams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });

  private static getQuery(homeOrAway: string) {
    switch (homeOrAway) {
      case 'home': return leaderboardHomeQuery;
      case 'away': return leaderboardAwayQuery;
      default: return leaderboardAllQuery;
    }
  }
}
