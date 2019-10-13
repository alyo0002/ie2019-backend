import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication, HttpService, HttpModule } from '@nestjs/common';

describe('Testing', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeAll(async () => {
    const testAppModule: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        HttpModule,
      ],
    }).compile();

    app = testAppModule.createNestApplication();
    httpService = testAppModule.get<HttpService>(HttpService);
    await app.init();
  });

  it('GET / should return "Service is online"', async () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Service is online');
  });

  describe('Authentication Module', () => {
    it('fails POST /authentication/signin {username: \'invalid@email.com\', password: \'password\'}', async () => {
      return request(app.getHttpServer())
        .post('/authentication/signin')
        .send({ username: 'invalid@email.com', password: 'password' })
        .expect(401);
    });

    it('passes POST /authentication/signin {username: \'test@email.com\', password: \'password\'}', async () => {
      const req = await request(app.getHttpServer())
        .post('/authentication/signin')
        .send({ username: 'test@create.com', password: 'password' })
        .expect(201);
      expect(req.body).not.toBe('');
    });
  });

  describe('Patient Module', () => {
    it('passes GET /patient/:id should return a JSON object the patient associated with the parsed ID', async () => {
      const req = request(app.getHttpServer())
        .get('/patient/1')
        .expect(200);
      expect(req).not.toBeNull();
    });

    it('passes GET /patient/list should return a JSON object of patients from the database', async () => {
      const req = request(app.getHttpServer())
        .get('/patient/list')
        .expect(200);
      expect(req).not.toBeNull();
    });

    it('passes GET /patient/listUpdate should return code 200 if successfull', async () => {
      return request(app.getHttpServer())
        .get('/patient/listUpdate')
        .expect(200);
    });
  });

  describe('Forms Module', () => {
    it('passes POST /forms', async () => {
      return request(app.getHttpServer())
        .post('/forms')
        .expect(201);
    });
  });

  describe('Scan Tracking Module', () => {
    it('is deprecated, in favour of the filesystem server', async () => {});
  });

  describe('Task Manager Module', () => {
    it('passes POST /task-manager/:userID', async () => {
      return request(app.getHttpServer())
        .post('/task-manager/:userID')
        .expect(201);
    });
    it('passes GET /task-manager/assignedTasks/:userID', async () => {
      const req = await request(app.getHttpServer())
        .get('/task-manager/assignedTasks/2')
        .expect(200);
      expect(req.body).not.toBeNull();
    });
    it('passes GET /task-manager/myTasks/:userID', async () => {
      const req = await request(app.getHttpServer())
        .get('/task-manager/myTasks/2')
        .expect(200);
      expect(req.body).not.toBeNull();
    });
  });

  describe('Treatment Module', () => {
    it('passes GET /treatment/totals', async () => {
      const req = await request(app.getHttpServer())
        .get('/treatment/totals')
        .expect(200);
      expect(req.body).not.toBeNull();
    });
    it('passes GET /treatment/:patientID', async () => {
      const req = await request(app.getHttpServer())
        .get('/treatment/1')
        .expect(200);
      expect(req.body).not.toBeNull();
    });
  });

  describe('User Module', () => {
    it('passes GET /user', async () => {
      const req = await request(app.getHttpServer())
        .get('/user')
        .expect(200);
      expect(req.body).not.toBeNull();
    });
    it('passes GET /user/:userID', async () => {
      const req = await request(app.getHttpServer())
        .get('/user/1')
        .expect(200);
      expect(req.body).not.toBeNull();
    });
  });
});
