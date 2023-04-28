import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../app';
import Teams from '../database/models/Teams';
import { Model } from 'sequelize';
import { Response } from 'superagent';
import { validAllTeams, validOneTeam } from './mocks/teams.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {

    
    describe('quando a requisição da certo', () => {
        
        afterEach(() => { sinon.restore() });

        it('deve retornar um status 200 quando fizer a requisição de todos os times na rota /teams', async () => {
            let chaihtppResponse: Response;

            const findStub = sinon.stub(Model, 'findAll').resolves(validAllTeams)
            const htppResponse = await chai.request(app).post('/teams')

            expect(htppResponse.status).to.equal(200)
            expect(htppResponse.body).to.equal(validAllTeams)

            findStub.restore();

        })

        it('deve retornar um status 200 quando fizer a requisição de um time pelo ID na rota /teams/:id', async () => {
            let chaihtppResponse: Response;

            const findStub = sinon.stub(Model, 'findByPk').resolves(validOneTeam)
            const htppResponse = await chai.request(app).post('/teams/:id')

            expect(htppResponse.status).to.equal(200)
            expect(htppResponse.body).to.equal(validOneTeam)

            findStub.restore();


        })
    })
    })