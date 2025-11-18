import express from 'express';
import { create } from 'utils/database';
import validateRequest from './logic/validate-request';

export const createPropertyHandler = async (req: express.Request, res: express.Response) => {
  const propertyData = req.body;
  try {
    const validationResult = validateRequest(propertyData);
    if (!validationResult.valid) {
      return res.status(400).json({ message: 'Invalid property data', errors: validationResult.errors });
    }
    const createdProperty = await create(propertyData);
    res.status(201).json({ message: 'Property created successfully', data: createdProperty });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create property', error: (error as Error).message });
  }
};
