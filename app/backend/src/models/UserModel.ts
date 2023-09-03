import IUser from '../Interfaces/User';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel {
  private model = SequelizeUser;

  async doLogin(email: string): Promise<IUser | null> {
    return this.model.findOne({ where: { email } });
  }
}
