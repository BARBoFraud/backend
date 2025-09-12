import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let testEmail: string;
    const testPassword = '12345678';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        testEmail = `test-${Date.now()}@example.com`;
    });

    afterAll(async () => {
        await app.close();
    });

    it('should register a user', async () => {
        const res = await request
            .default(app.getHttpServer())
            .post('/users/register')
            .send({
                name: 'Test',
                last_name1: 'Fortnite',
                last_name2: 'Fortnite',
                email: testEmail,
                password: testPassword
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message');
    });

    it('should not register a duplicated user', async () => {
        const res = await request
            .default(app.getHttpServer())
            .post('/users/register')
            .send({
                name: 'Test',
                last_name1: 'Fortnite',
                last_name2: 'Fortnite',
                email: testEmail,
                password: testPassword
            });

        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('error');
    });
});
