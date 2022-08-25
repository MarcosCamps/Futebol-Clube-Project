// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import Matches from '../database/models/matches';
// import { Model } from 'sequelize/types';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// const matchesMock = 

// describe('Matches route /POST', () => {

//   let chaiHttpResponse: Response;

//   beforeEach(async () => {
//     sinon
//       .stub(Matches, "findAll")
//       .resolves(Matches as unknown as Model<any, any>[]);
//       chaiHttpResponse = await chai.request(app).post('/matches')
//   });

//   afterEach(()=>{
//     (Matches.findOne as sinon.SinonStub).restore();
//   })

//   it('Should return status 200', async () => {
//     expect(chaiHttpResponse.status).to.be.equal(200)
//   });

//   it('Should return array of matches', () => {
//     expect(chaiHttpResponse.body).to.be.deep.equal(Matches);
//   });
// });