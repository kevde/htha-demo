import { validateRequest } from './validate-request';

describe('Validate Request', () => {
	it('should provide valid request based from Property type', () => {
    const params = {
      title: 'Beautiful House',
      description: 'A lovely 3-bedroom house',
      price: 750000,
      address: {
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62704'
      },
    };
    const result = validateRequest(params);
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('should fail validation for missing required fields', () => {
    const params = {
      description: 'Missing title and price',
      address: {
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62704',
        suburb: 'Downtown',
      },
    };
    const result = validateRequest(params);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors && result.errors.some(e => /title is a required field|price is a required field/i)).toBe(true);
  });
});
