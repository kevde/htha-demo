import express from 'express';
import { query } from 'utils/database';
import { validateSearchParams } from './logic/validate-params';
import { getPropertiesWithRangeMarker, getPropertiesWithRangeMarkerFromList } from './logic/price-range-decorator';
import { generateQueryPayload } from './logic/generate-query-payload';
import { Property } from 'types';
export const searchPropertyHandler = async (req: express.Request, res: express.Response) => {
  const propertyParams = req.query;
  try {
    const validation = validateSearchParams(propertyParams);
    if (!validation.valid) {
      return res.status(400).json({ message: 'Invalid search parameters', errors: validation.errors });
    }

    // Simple in-memory search using sample data for integration/testing
    const queryPayload = generateQueryPayload(propertyParams);
    let results: Property[] = await query(queryPayload) as Property[];
    // Decorate based on the result set's own average (not the whole DB)
    results = getPropertiesWithRangeMarkerFromList(results, results);

    return res.status(200).json({ message: 'Search results', data: results });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to search properties', error: (error as Error).message });
  }
};
