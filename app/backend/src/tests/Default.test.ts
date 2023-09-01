import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import mapStatusHTTP from '../utils/mapStatusHTTP';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET default route', () => {
  afterEach(sinon.restore);

  it('GET Healthy', async () => {
    const {status, body} = await chai.request(app).get('/');

    expect(status).to.be.equal(200);
    expect(body).to.haveOwnProperty('ok');
    expect(body.ok).to.be.equal(true);
  });

  it('DEFAULT return of mapStatusHTTP.', async () => {
    const consoleStub = sinon.stub(console, 'error');

    const unknownStatus = 'UNKNOWN_STATUS';
    const result = mapStatusHTTP(unknownStatus);

    expect(result).to.equal(500);

    expect(consoleStub.calledWith(`Status desconhecido: ${unknownStatus}`)).to.be.false;
  });
});
