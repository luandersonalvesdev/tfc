import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch, { INewMatch, INewScoreboard } from '../Interfaces/Match';
import SequelizeMatch from '../database/models/SequelizeMatch';

const stringToBool = (str: string) => {
  switch (str) {
    case 'true': return true;
    default: return false;
  }
};

const whereCondition: { inProgress?: boolean } = {};

export default class MatchModel {
  private model = SequelizeMatch;

  async getAll(inProgress: string): Promise<IMatch[]> {
    if (inProgress) {
      whereCondition.inProgress = stringToBool(inProgress);
    } else {
      delete whereCondition.inProgress;
    }
    const dBResponse = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: whereCondition,
    });
    return dBResponse;
  }

  getById(matchId: number): Promise<IMatch | null> {
    return this.model.findByPk(matchId);
  }

  async finishMatch(matchId: number) {
    await this.model.update({ inProgress: false }, {
      where: {
        id: matchId,
      },
    });
  }

  async updateScoreboard(newScoreboard: INewScoreboard, matchId: number) {
    await this.model.update({
      homeTeamGoals: newScoreboard.homeTeamGoals,
      awayTeamGoals: newScoreboard.awayTeamGoals,
    }, {
      where: {
        id: matchId,
      },
    });
  }

  async addNewMatch(newMatch: INewMatch) {
    return this.model.create({ ...newMatch, inProgress: true });
  }
}
