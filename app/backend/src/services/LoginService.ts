import * as bcrypt from 'bcryptjs';
import loginSchema from '../validations/loginSchema';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserLogin } from '../Interfaces/User';
import UserModel from '../models/UserModel';
import { generateToken } from '../auth/jwtAuth';
import { JwtTokenReturn } from '../Interfaces/Jwt';

export default class LoginService {
  constructor(
    private userModel = new UserModel(),
  ) {}

  public async doLogin(userData: IUserLogin): Promise<ServiceResponse<JwtTokenReturn>> {
    const userFromDb = await this.userModel.doLogin(userData.email);

    const { error } = loginSchema.validate(userData);
    if (error || !userFromDb || !bcrypt.compareSync(userData.password, userFromDb.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const { password, ...payload } = userFromDb;
    const token = generateToken(payload);
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
