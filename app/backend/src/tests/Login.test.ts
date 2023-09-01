import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { 
  userMockWithPassword, validLoginMock, invalidLoginMock, validReturnPayload, 
  validToken, invalidToken, validLoginMockWithWrongPass 
} from './mocks/User.mock';
import SequelizeUser from '../database/models/SequelizeUser';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST login route', () => {

  afterEach(sinon.restore);

  it('Success - Login', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(userMockWithPassword as any);
    sinon.stub(bcrypt, 'compareSync').returns(true);

    const {status, body} = await chai.request(app).post('/login').send(validLoginMock);

    expect(status).to.be.equal(200);
    expect(body).to.haveOwnProperty('token');
  });

  it('Bad Request - Login without email', async () => {
    sinon.stub(bcrypt, 'compareSync').returns(true);

    const {status, body} = await chai.request(app).post('/login').send(invalidLoginMock);

    expect(status).to.be.equal(400);
    expect(body).to.haveOwnProperty('message');
    expect(body.message).to.be.equal('All fields must be filled');
  });

  it('Unauthorized - Login with wrong password', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const {status, body} = await chai.request(app).post('/login').send(validLoginMockWithWrongPass);

    expect(status).to.be.equal(401);
    expect(body).to.haveOwnProperty('message');
    expect(body.message).to.be.equal('Invalid email or password');
  });
});

describe('GET login/role route', () => {

  afterEach(sinon.restore);

  it('Success - get role', async () => {
    sinon.stub(jwt, 'verify').returns(validReturnPayload as any);

    const {status, body} = await chai.request(app).get('/login/role').set('authorization', `Bearer ${validToken}`);
    
    expect(status).to.be.equal(200);
    expect(body).to.haveOwnProperty('role');
    expect(body.role).to.be.equal('admin');
  });

  it('Unauthorized - get role without token', async () => {
    sinon.stub(jwt, 'verify').returns(validReturnPayload as any);

    const {status, body} = await chai.request(app).get('/login/role');
    
    expect(status).to.be.equal(401);
    expect(body).to.haveOwnProperty('message');
    expect(body.message).to.be.equal('Token not found');
  });

  it('Unauthorized - get role with invalid token', async () => {
    sinon.stub(jwt, 'verify').throws(new Error('invalid token'));
    sinon.stub(console, 'log').returns();

    const {status, body} = await chai.request(app).get('/login/role').set('authorization', `Bearer ${invalidToken}`);
    
    expect(status).to.be.equal(401);
    expect(body).to.haveOwnProperty('message');
    expect(body.message).to.be.equal('Token must be a valid token');
  });
});
