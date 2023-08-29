import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { mockAllTeams, mockTeamById } from './mocks/Team.mock';
import SequelizeTeam from '../database/models/SequelizeTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET teams route', () => {

  afterEach(sinon.restore);

  it('Success - GET all teams', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(mockAllTeams as any);

    const {status, body} = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(mockAllTeams);
  });

  it('Success - GET team by id', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(mockTeamById as any);

    const { status, body } = await chai.request(app).get('/teams/2');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(mockTeamById);
    expect(body.id).to.be.equal(2);
    expect(body.teamName).to.be.equal('Bahia');
  });

  it('Not found - GET team by id', async () => {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/0');

    expect(status).to.be.equal(404);
    expect(body).to.haveOwnProperty('message');
    expect(body.message).to.be.equal('team not found');
  });
});
