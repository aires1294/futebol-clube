import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';
import { Model } from 'sequelize';
import { Response } from 'superagent';
import { validAllMatches, validMatchesTrue, validOneMatch, validOneMatchFalse } from './mocks/matches.mock';
import Matches from '../database/models/Matches';
import ValidationToken from '../Authentication/token';


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
            expect(htppResponse.body).to.be.deep.equal(validAllMatches)

            findStub.restore();

        })

        it('deve retornar um status 200  fizer a requisição dos jogos em ANDAMENTO /matches?inProgress=true', async () => {
            let chaihtppResponse: Response;

            // const findStub = sinon.stub(Model, 'findAll').resolves(validAllMatches as unknown as Matches[])
            const htppResponse = await chai.request(app).get('/matches?inProgress=true')

            expect(htppResponse.status).to.be.deep.equal(200)
            // expect(htppResponse.body).to.equal(validMatchesTrue)

            // findStub.restore();

        })

        // it('deve retornar um status 200  fizer a requisição dos jogos em ANDAMENTO /matches?inProgress=false', async () => {
        //     let chaihtppResponse: Response;

        //     const htppResponse = await chai.request(app).get('/matches?inProgress=false')

        //     expect(htppResponse.status).to.equal(200)


        // })

        it('deve retornar um status 200  finalizar uma partida que estava em andamento /matches/:id/finish', async () => {
            let chaihtppResponse: Response;

            chaihtppResponse = await chai.request(app).patch('/matches/49/finish').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9fSwiaWF0IjoxNjgyNjI4MjczLCJleHAiOjE2ODI3MTQ2NzN9.jLe9d6cjFdxT4n9RstKOPQ-rcylJOK44krHGBqR4FJE')

            expect(chaihtppResponse.status).to.equal(200)
            expect(chaihtppResponse.body).to.be.deep.equal({ "message": "Finished" })

        })

    //     it.only('deve retornar um status 200  ao editar uma partida /matches/:id', async () => {
    //         let chaihtppResponse: Response;
            
    //         const findStub = sinon.stub(Model, 'update').resolves(validAllMatches as unknown as Matches)

    //         chaihtppResponse = await chai.request(app).patch('/matches/49').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9fSwiaWF0IjoxNjgyNjI4MjczLCJleHAiOjE2ODI3MTQ2NzN9.jLe9d6cjFdxT4n9RstKOPQ-rcylJOK44krHGBqR4FJE')
    //         .send({
    //             "homeTeamGoals": 2,
    //             "awayTeamGoals": 1
    //         })

    //         expect(chaihtppResponse.status).to.equal(200)
    //         // expect(chaihtppResponse.body).to.equal(validOneMatch)

    //     })
    })
    // ----------------------------------------------------------------------------------------
    // Não sei PQ NAO TA FUNCIONANDO
    //-----------------------------------------------------------------------------------------
    describe('quando a requisição da errado', () => {

        afterEach(() => { sinon.restore() });

        it('deve retornar um status 401 quando tentar finalizar uma partida que estava em andamento e não achar o TOKEN /matches/:id/finish', async () => {
            let chaihtppResponse: Response;

            chaihtppResponse = await chai.request(app).patch('/matches/:id/finish').set('Authorization', '')
            .send({
                "homeTeamGoals": 2,
                "awayTeamGoals": 1
            })

            expect(chaihtppResponse.status).to.equal(401)
            expect(chaihtppResponse.body).to.be.deep.equal({ "message": "Token not found" })

        })

    //     it('deve retornar um status 401 quando tentar finalizar uma partida que estava em andamento e não tiver um TOKEN válido /matches/:id/finish', async () => {
    //         let chaihtppResponse: Response;

    //         chaihtppResponse = await chai.request(app).patch('/matches/49/finish').set('Authorization', 'asdasdsad.eyJkYXRhIjp7ImlkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9fSwiaWF0IjoxNjgyNjI4MjczLCJleHAiOjE2ODI3MTQ2NzN9.jLe9d6cjFdxT4n9RstKOPQ-rcylJOK44krHGBqR4FJE')
    //         .send({
    //             "homeTeamGoals": 2,
    //             "awayTeamGoals": 1
    //         })

    //         expect(chaihtppResponse.status).to.equal(401)
    //         expect(chaihtppResponse.body).to.be.deep.equal({ "message": "Token must be a valid token" })

    //     })
        
    })


    })
