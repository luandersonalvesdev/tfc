import * as joi from 'joi';

const newMatchSchema = joi.object({
  homeTeamId: joi.number().required(),
  awayTeamId: joi.number().required(),
  homeTeamGoals: joi.number().required(),
  awayTeamGoals: joi.number().required(),
});

export default newMatchSchema;
