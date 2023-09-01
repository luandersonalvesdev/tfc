import * as joi from 'joi';

const loginSchema = joi.object({
  email: joi.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).required(),
  password: joi.string().min(6).required(),
});

export default loginSchema;
