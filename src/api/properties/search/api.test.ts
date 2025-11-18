import express from 'express';
import request from 'supertest';
import { routes } from '../../../routes';
import { SampleProperties } from './test/fixtures';

describe('Properties Search API (integration)', () => {
  let app: express.Application;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    routes(app);

    // Generate properties first
    await request(app).post('/properties').send(SampleProperties[0]).expect(201);
    await request(app).post('/properties').send(SampleProperties[1]).expect(201);
    await request(app).post('/properties').send(SampleProperties[2]).expect(201);
    await request(app).post('/properties').send(SampleProperties[3]).expect(201);
    await request(app).post('/properties').send(SampleProperties[4]).expect(201);
  });

  it('searches properties via GET /properties/search by price range', async () => {
    const suburb = SampleProperties[0].address.suburb;
    const res = await request(app).get('/properties/search').query({ minPrice: 100000, maxPrice: 199999 }).expect(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].address.suburb).toBe(suburb);
    expect(res.body.data[0].priceRangeMarker).toBe(
      'Average'
    );
  });

  it('searches properties via GET /properties/search by suburb - Manhattan', async () => {
    const suburb = SampleProperties[0].address.suburb;
    const res = await request(app).get('/properties/search').query({ suburb }).expect(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].address.suburb).toBe(suburb);
    expect(res.body.data[0].priceRangeMarker).toBe(
      'Average'
    );
  });

  it('searches properties via GET /properties/search by suburb - Hollywood', async () => {
    const suburb = SampleProperties[2].address.suburb;
    const res = await request(app).get('/properties/search').query({ suburb }).expect(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    expect(res.body.data[0].address.suburb).toBe(suburb);
    expect(res.body.data[0].priceRangeMarker).toBe(
      'Average'
    );
    expect(res.body.data[1].address.suburb).toBe(suburb);
    expect(res.body.data[1].priceRangeMarker).toBe(
      'Below Average'
    );
    expect(res.body.data[2].address.suburb).toBe(suburb);
    expect(res.body.data[2].priceRangeMarker).toBe(
      'Above Average'
    );
  });
});
