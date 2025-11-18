import express from 'express';
import * as PropertiesRoutes from './api/properties';

export const routes = (app: express.Application) => {
  app.post('/properties', PropertiesRoutes.createPropertyHandler);
  app.get('/properties/search', PropertiesRoutes.searchPropertyHandler);
};
