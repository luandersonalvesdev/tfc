import { sign, verify } from 'jsonwebtoken';
import { JwtPayloadLogin } from '../Interfaces/Jwt';

const secret = process.env.JWT_SECRET || 'secret';

const generateToken = (payload: JwtPayloadLogin) =>
  sign(payload, secret, { algorithm: 'HS256', expiresIn: '1d' });

const getPayload = (token: string) => {
  const [, trueToken] = token.split(' ');
  try {
    const payload = verify(trueToken, secret);
    return payload;
  } catch (error) {
    console.log(error);
    return 'invalid token';
  }
};

export {
  generateToken,
  getPayload,
};
