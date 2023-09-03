import * as joi from 'joi';

const scoreboardSchema = joi.object({
  homeTeamGoals: joi.number().required(),
  awayTeamGoals: joi.number().required(),
});

export default scoreboardSchema;
