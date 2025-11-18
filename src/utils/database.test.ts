import { RecordType } from 'types';
import * as dbUtils from './database';

describe('Database Utils', () => {
  beforeEach(() => {
    dbUtils.reset();
  });

  it('should create a new record from a file stored database', async () => {
    const response = await dbUtils.create({ name: 'Test Record' });
    expect(response).toBeDefined();
    expect(response.id).toBeDefined();
    expect(response.name).toBe('Test Record');
  });
  it('should read a record from a file stored database', async () => {
    const created = await dbUtils.create({ name: 'Test Record' });

    const response = await dbUtils.read({ id: created.id });
    expect(response).toBeDefined();
    expect(response!.id).toBe(created.id);
    expect(response!.name).toBe(created.name);
  });

  describe('should query a record using attributes', () => {
    let firstEntry: RecordType;
    let secondEntry: RecordType;
    let thirdEntry: RecordType;
    let fourthEntry: RecordType;

    beforeEach(async () => {
      firstEntry = await dbUtils.create({ name: 'Test Record', price: 100, address: { city: 'Testville' } });
      secondEntry = await dbUtils.create({ name: 'Second Record', price: 200, address: { city: 'Exampletown' } });
      thirdEntry = await dbUtils.create({ name: 'Third Record', price: 300, address: { city: 'Townsfolk' } });
      fourthEntry = await dbUtils.create({ name: 'Fourth Record', price: 400, address: { city: 'Townsfolk' } });
    });

    it('query by name', async () => {
      const queryResponse = await dbUtils.query({ name: firstEntry.name });
      expect(queryResponse.length).toBe(1);
      expect(queryResponse[0]).toBeDefined();
      expect(queryResponse[0]!.id).toBe(firstEntry.id);
      expect(queryResponse[0]!.name).toBe(firstEntry.name);
    });

    it('query via deeper path', async () => {
      const queryResponse = await dbUtils.query({ 'address.city': secondEntry.address.city });
      expect(queryResponse.length).toBe(1);
      expect(queryResponse[0]).toBeDefined();
      expect(queryResponse[0]!.id).toBe(secondEntry.id);
      expect(queryResponse[0]!.name).toBe(secondEntry.name);
    })

    it('query with min and max values', async () => {
      const firstResponse = await dbUtils.query({ price: { min: 150, max: 250 } });
      expect(firstResponse.length).toBe(1);
      expect(firstResponse[0]!.id).toBe(secondEntry.id);
      expect(firstResponse[0]!.name).toBe(secondEntry.name);
    })

    it('query with in-list criteria of a value', async () => {
      const response = await dbUtils.query({ 'address.city': { in: ['Testville', 'Townsfolk'] } });
      expect(response.length).toBe(3);
      const responseIds = response.map(r => r.id);
      expect(responseIds).toContain(firstEntry.id);
      expect(responseIds).toContain(thirdEntry.id);
      expect(responseIds).toContain(fourthEntry.id);
    });
  });

  it('should update a record from a file stored database', async () => {
    const created = await dbUtils.create({ name: 'Test Record' });

    const response = await dbUtils.update({ id: created.id, name: 'Updated Record' });
    expect(response).toBeDefined();
    expect(response.id).toBe(created.id);
    expect(response.name).toBe('Updated Record');
  });
  it('should delete a record from a file stored database', async () => {
    const created = await dbUtils.create({ name: 'Test Record' });

    await dbUtils.remove({ id: created.id });
    const response = await dbUtils.read({ id: created.id });
    expect(response).toBe(null);
  });
});
