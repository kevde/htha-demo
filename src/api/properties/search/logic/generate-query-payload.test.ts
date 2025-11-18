import { generateQueryPayload } from "./generate-query-payload";

describe('Generate Query Payload', () => {
  it('should generate correct query payload for given search params', () => {
    const params = { minPrice: '500000', maxPrice: '1000000', suburb: 'Downtown' };
    const queryPayload = generateQueryPayload(params);

    expect(queryPayload).toEqual({
      price: { min: 500000, max: 1000000 },
      'address.suburb': 'Downtown',
    });
  });

  it('should handle city parameter', () => {
    const params = { city: 'New York' };
    const queryPayload = generateQueryPayload(params);

    expect(queryPayload).toEqual({
      'address.city': 'New York',
    });
  });

  it('should handle suburb parameter', () => {
    const params = { suburb: 'Downtown' };
    const queryPayload = generateQueryPayload(params);

    expect(queryPayload).toEqual({
      'address.suburb': 'Downtown',
    });
  });
});
