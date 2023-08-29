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

describe('GET default route', () => {
  it('GET Healthy', async () => {
    const {status, body} = await chai.request(app).get('/');

    expect(status).to.be.equal(200);
    expect(body).to.haveOwnProperty('ok');
    expect(body.ok).to.be.equal(true);
  });

  it('Internal server error', async () => {
    const {status, body} = await chai.request(app).get('/');

    expect(status).to.be.equal(200);
    expect(body).to.haveOwnProperty('ok');
    expect(body.ok).to.be.equal(true);
  });
});
