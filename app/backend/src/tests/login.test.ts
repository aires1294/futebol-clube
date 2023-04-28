import * as sinon from 'sinon';
import * as chai from 'chai';
// import chaiHttp from 'chai-http';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Model } from 'sequelize';
import { Response } from 'express';
import { inValidEmail, invalidPassword, validEmail, validLogin, validPassword } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
    describe('quando há um erro na requisição', () => {
        
        afterEach(() => { sinon.restore() })

        it('deve retornar um status 400 quando password não for preenchido', async () => {
            // CONFERIR O /teams
            const htppResponse = await chai.request(app).post('/login').send(validEmail)
            expect(htppResponse.status).to.equal(400)
            expect(htppResponse.body).to.equal({ message: 'All fields must be filled'})
        })
    })

    it('deve retornar um status 400 quando email não for preenchido', async () => {
        // CONFERIR O /teams
        const htppResponse = await chai.request(app).post('/login').send(validPassword)
        expect(htppResponse.status).to.equal(400)
        expect(htppResponse.body).to.equal({ message: 'All fields must be filled'})

    })

    it('deve retornar um status 401 quando password for invalida', async () => {
        // CONFERIR O /teams
        const htppResponse = await chai.request(app).post('/login').send(invalidPassword)
        expect(htppResponse.status).to.equal(401)
        expect(htppResponse.body).to.equal({ message: 'Invalid email or password'})
    })

    it('deve retornar um status 401 quando email for invalido', async () => {
        // CONFERIR O /teams
        const htppResponse = await chai.request(app).post('/login').send(inValidEmail)
        expect(htppResponse.status).to.equal(401)
        expect(htppResponse.body).to.equal({ message: 'Invalid email or password'})

    })

    describe('quando requisição deu certo', () => {
        it('deve retornar um status 200 quando email e password forem validos', async () => {
            const htppResponse = await chai.request(app).post('/login').send(validLogin)
            expect(htppResponse.status).to.equal(200)
            expect(htppResponse.body).to.haveOwnProperty('token')
        })
    })


    })