import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';

import { Response } from 'superagent';
// import { send } from 'process';

chai.use(chaiHttp);

const { expect } = chai;

const mockLogin = {
    username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFciLCJpYXQiOjE2NjExMDg5NTJ9.sucdSMDt4VWsEMiyuCa5VOEFYSK9FnJ3OFeLq-yhTEA'

describe('login route', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mockLogin as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Login successful', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'admin@admin.com', password: 'secret_admin'});

    const { token } = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;

    expect(status).to.equal(200)
    expect(token).to.exist
  });

  // it('Empty email', async () => {
  //   chaiHttpResponse = await chai
  //   .request(app)
  //   .post('/login')
  //   .send({ email: '', password: 'secret_admin'});

  //   const { message } = chaiHttpResponse.body;
  //   const { status } = chaiHttpResponse;

  //   expect(message).to.equal('All fields must be filled')
  //   expect(status).to.equal(400)
  // })

  it('Empty password', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: ''})

    const { message } = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;

    expect(message).to.equal('All fields must be filled')
    expect(status).to.equal(400)
  })

  it('Incorrect password', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'admin@admin.com', password: 'incorrect_password'});

    const { message } = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;

    expect(message).to.equal('Incorrect email or password')
    expect(status).to.equal(401)
  })

  it('Token validate', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate')
    .set('authorization', mockToken)
    .send();

    const { role } = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;

    expect(role).to.equal('admin')
    expect(status).to.equal(200)
  })

  it('Token is not found', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate')
    .send();

    const { status } = chaiHttpResponse;

    expect(status).to.equal(404)
  })
});
