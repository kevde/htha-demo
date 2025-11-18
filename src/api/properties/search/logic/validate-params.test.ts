import { validateSearchParams } from './validate-params';

describe('Validate Search Params', () => {
	it('should pass validation for valid params', () => {
		const params = { minPrice: 500000, maxPrice: 1000000, city: 'New York' };
		const result = validateSearchParams(params);
		expect(result.valid).toBe(true);
		expect(result.errors).toBeUndefined();
	});

	it('should fail validation for invalid params', () => {
		const params = { minPrice: -500000, maxPrice: 'one million' };
		const result = validateSearchParams(params);

		expect(result.valid).toBe(false);
		expect(result.errors).toBeDefined();
		expect(result.errors && result.errors.some(e => /greater than or equal to 0|must be a `number`|must be a number/i)).toBe(true);
	});
});
