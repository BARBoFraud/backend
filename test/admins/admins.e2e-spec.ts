import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let username: string;
    const testPassword = '12345678';
    let adminAccessToken: string;
    let accessToken: string;
    let refreshToken: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        username = `test-${Date.now()}`;
    });

    afterAll(async () => {
        await app.close();
    });

    it('should login an existent admin', async () => {
        const res = await request
            .default(app.getHttpServer())
            .post('/auth/admins/login')
            .send({
                username: 'admin',
                password: 'admin'
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('refresh_token');
        adminAccessToken = res.body.access_token;
    });

    it('should register an admin', async () => {
        const res = await request
            .default(app.getHttpServer())
            .post('/admins/create')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send({
                username: username,
                password: testPassword
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message');
    });

    it('should login the new admin', async () => {
        const res = await request
            .default(app.getHttpServer())
            .post('/auth/admins/login')
            .send({
                username: username,
                password: testPassword
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('refresh_token');
        refreshToken = res.body.refresh_token;
    });

    it('should not login an incorrect admin', async () => {
        const res = await request
            .default(app.getHttpServer())
            .post('/auth/admins/login')
            .send({
                username: username,
                password: testPassword + 'aaa'
            });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });

    it('should refresh the access token of an admin', async () => {
        const res = await request
            .default(app.getHttpServer())
            .post('/auth/admins/refresh')
            .send({
                refresh_token: refreshToken
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('access_token');
        accessToken = res.body.access_token;
    });

    it('should get the profile of the admin', async () => {
        const res = await request
            .default(app.getHttpServer())
            .get('/admins/profile')
            .set('Authorization', `Bearer ${accessToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username');
    });

    it('should not accept an incorrect token type', async () => {
        const res = await request
            .default(app.getHttpServer())
            .get('/admins/profile')
            .set('Authorization', `Bearer ${refreshToken}`);

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
});
