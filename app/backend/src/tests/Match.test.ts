import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatch from '../database/models/SequelizeMatch';
import { allMatches, matchesInProgress, matchesNotInProgress, 
  validNewScoreboardMock, invalidNewScoreboardMock, validNewMatch, newMatchReturnMock, 
  newMatchResponseMock, invalidNewMatchInvalidId, invalidNewMatchEqualId, invalidNewMatchWithoutKey} from './mocks/Match.mock';
import { validReturnPayload, validToken } from './mocks/User.mock';
import * as jwt from 'jsonwebtoken';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { mockSecondTeamById, mockTeamById } from './mocks/Team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET matches route', () => {

  afterEach(sinon.restore);

  it('Success - GET all matches', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as any);

    const {status, body} = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(allMatches);
  });

  it('Success - GET all matches inProgress = TRUE', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);

    const {status, body} = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesInProgress);
  });

  it('Success - GET all matches inProgress = FALSE', async () => {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesNotInProgress as any);

    const {status, body} = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesNotInProgress);
  });
});

describe('PATCH matches route', () => {

  beforeEach(() => {
    sinon.stub(jwt, 'verify').returns(validReturnPayload as any);
  })

  afterEach(sinon.restore);

  it('Success - Updated inProgress match', async () => {
    sinon.stub(SequelizeMatch, 'findOne').resolves(matchesInProgress[0] as any);
    sinon.stub(SequelizeMatch, 'update').resolves();

    const {status, body} = await chai.request(app).patch('/matches/1/finish').set('authorization', `Bearer ${validToken}`);

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ message: 'Finished' });
  });

  it('Not found - Updated inProgress match', async () => {
    sinon.stub(SequelizeMatch, 'findOne').resolves(null);
    sinon.stub(SequelizeMatch, 'update').resolves();

    const {status, body} = await chai.request(app).patch('/matches/1/finish').set('authorization', `Bearer ${validToken}`);

    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({ message: 'Match not found' });
  });

  it('Success - Updated scoreBoard match', async () => {
    sinon.stub(SequelizeMatch, 'update').resolves();

    const {status, body} = await chai.request(app).patch('/matches/1')
      .set('authorization', `Bearer ${validToken}`)
      .send(validNewScoreboardMock);

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ message: 'Scoreboard updated' });
  });

  it('Bad request - Updated scoreBoard match', async () => {
    sinon.stub(SequelizeMatch, 'update').resolves();

    const {status, body} = await chai.request(app).patch('/matches/1')
      .set('authorization', `Bearer ${validToken}`)
      .send(invalidNewScoreboardMock);

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: '"homeTeamGoals" is required' });
  });
});

describe('POST matches route', () => {

  beforeEach(() => {
    sinon.stub(jwt, 'verify').returns(validReturnPayload as any);
  })

  afterEach(sinon.restore);

  it('Created - match', async () => {
    sinon.stub(SequelizeTeam, 'findByPk')
      .onFirstCall().resolves(mockTeamById as any)
      .onSecondCall().resolves(mockSecondTeamById as any);
    sinon.stub(SequelizeMatch, 'create').resolves(newMatchReturnMock as any);

    const {status, body} = await chai.request(app)
      .post('/matches')
      .send(validNewMatch)
      .set('authorization', `Bearer ${validToken}`);

    expect(status).to.be.equal(201);
    expect(body).to.be.deep.equal(newMatchResponseMock);
  });

  it('Bad request - match with team id invalid', async () => {
    sinon.stub(SequelizeTeam, 'findByPk')
      .onFirstCall().resolves(mockTeamById as any)
      .onSecondCall().resolves(null);

      const {status, body} = await chai.request(app)
      .post('/matches')
      .send(invalidNewMatchInvalidId)
      .set('authorization', `Bearer ${validToken}`);

    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({message: "There is no team with such id!"});
  });

  it('Unprocessable entity - match with equal team id', async () => {
    
    const {status, body} = await chai.request(app)
      .post('/matches')
      .send(invalidNewMatchEqualId)
      .set('authorization', `Bearer ${validToken}`);

    expect(status).to.be.equal(422);
    expect(body).to.be.deep.equal({message: "It is not possible to create a match with two equal teams"});
  });

  it('Bad request - match without values', async () => {
    sinon.stub(SequelizeTeam, 'findByPk')

      const {status, body} = await chai.request(app)
      .post('/matches')
      .send(invalidNewMatchWithoutKey)
      .set('authorization', `Bearer ${validToken}`);

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({message: '"homeTeamId" is required'});
  });
});