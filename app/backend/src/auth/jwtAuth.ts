import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { JwtPayloadLogin } from '../Interfaces/Jwt';

const secret = process.env.JWT_SECRET || 'secret';

const generateToken = (payload: JwtPayloadLogin) =>
  sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' });

const getPayload = (token: string) => {
  const [, trueToken] = token.split(' ');
  try {
    const { role } = verify(trueToken, secret) as JwtPayload;
    return { data: { role } };
  } catch (error) {
    console.log(error);
    return { data: { message: 'Token must be a valid token' } };
  }
};

export {
  generateToken,
  getPayload,
};
