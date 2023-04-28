import * as sinon from 'sinon';
import * as chai from 'chai';
// import chaiHttp from 'chai-http';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';
import { Model } from 'sequelize';
import { Response } from 'superagent';
import { validAllMatches, validMatchesTrue } from './mocks/matches.mock';
import Matches from '../database/models/Matches';


chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {

    
    describe('quando a requisição da certo', () => {

        afterEach(() => { sinon.restore() });

        it('deve retornar um status 200 quando fizer a requisição de todos os jogos na rota /matches', async () => {
            let chaihtppResponse: Response;

            const findStub = sinon.stub(Model, 'findAll').resolves(validAllMatches as unknown as Matches[])
            const htppResponse = await chai.request(app).get('/matches')

            expect(htppResponse.status).to.equal(200)
            expect(htppResponse.body).to.equal(validAllMatches)

            findStub.restore();

        })

        it('deve retornar um status 200  fizer a requisição dos jogos em ANDAMENTO /matches', async () => {
            let chaihtppResponse: Response;

            const findStub = sinon.stub(Model, 'findAll').resolves(validAllMatches as unknown as Matches[])
            const htppResponse = await chai.request(app).get('/matches?inProgress=true')

            expect(htppResponse.status).to.equal(200)
            expect(htppResponse.body).to.equal(validMatchesTrue)

            findStub.restore();

        })

    })
    })