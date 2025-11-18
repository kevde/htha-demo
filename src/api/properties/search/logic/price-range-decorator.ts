import _ from 'lodash';
import { Property } from 'types';
import { query } from 'utils/database';

export const getAveragePrice = (properties: Array<Property>): number => {
  const overallPrices = properties.reduce((sum, property) => sum + property.price, 0);
  const numberOfProperties = properties.length;
  return overallPrices / numberOfProperties;
};

const getPropertyRangeMarker = (property: Property, averagePrice: number) => {
  let priceRangeMarker = 'N/A';
  const propertyPrice = property.price;
  if (propertyPrice < averagePrice) {
    priceRangeMarker = 'Below Average';
  } else if (propertyPrice === averagePrice) {
    priceRangeMarker = 'Average';
  } else {
    priceRangeMarker = 'Above Average';
  }
  return priceRangeMarker;
};

export const getPropertiesWithRangeMarker = async (
  properties: Array<Property>
): Promise<Array<Property>> => {
  // Use the full dataset from the DB to compute comparative averages
  const propertiesInSuburb: Property[] = await query({}) as Property[];
  return getPropertiesWithRangeMarkerFromList(properties, propertiesInSuburb);
};

export const getPropertiesWithRangeMarkerFromList = (properties: Property[], propertiesInSuburb: Property[]): Property[] => {
  // Compute a single comparative average from the provided list and mark each property
  const overallAverage = getAveragePrice(propertiesInSuburb);

  return properties.map((property) => {
    const priceRangeMarker = getPropertyRangeMarker(property, overallAverage);
    return {
      ...property,
      priceRangeMarker,
    };
  });
}

