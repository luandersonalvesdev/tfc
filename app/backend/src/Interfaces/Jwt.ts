export type JwtPayloadLogin = {
  id: number,
  username: string,
  role: string,
  email: string,
};

export type JwtTokenReturn = {
  token: string,
};
