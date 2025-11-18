import express from 'express';
import request from 'supertest';
import { routes } from '../../routes';

describe('Properties API (integration)', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    routes(app);
  });

  it('creates a property via POST /properties', async () => {
    const payload = {
      id: 10,
      title: 'Test Property',
      description: 'A test property',
      price: 12345,
      address: {
        street: '1 Test St',
        city: 'Testville',
        state: 'TS',
        zipCode: '00000'
      },
    };

    const res = await request(app).post('/properties').send(payload).expect(201);
    expect(res.body).toBeDefined();
    expect(res.body.message).toMatch(/created/i);
    expect(res.body.data).toMatchObject({ id: 10, title: 'Test Property', price: 12345 });
  });
});
