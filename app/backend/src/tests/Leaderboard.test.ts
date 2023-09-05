import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import sequelize from '../database/models';
import { leaderboardAllTeams, leaderboardHomeTeams, leaderboardAwayTeam } from './mocks/Leaderboard.mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('GET leaderboard route', () => {

  afterEach(sinon.restore);

  it('Success - GET all teams leaderboard', async () => {
    sinon.stub(sequelize, 'query').resolves(leaderboardAllTeams as any);

    const {status, body} = await chai.request(app).get('/leaderboard/');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(leaderboardAllTeams);
  });

  it('Success - GET home teams leaderboard', async () => {
    sinon.stub(sequelize, 'query').resolves(leaderboardHomeTeams as any);

    const {status, body} = await chai.request(app).get('/leaderboard/home');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(leaderboardHomeTeams);
  });

  it('Success - GET away teams leaderboard', async () => {
    sinon.stub(sequelize, 'query').resolves(leaderboardAwayTeam as any);

    const {status, body} = await chai.request(app).get('/leaderboard/away');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(leaderboardAwayTeam);
  });
});
