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
  const suburbs = _.uniq(properties.map(prop => prop.address.suburb));
  const propertiesInSuburb: Property[] = await query({ 'address.suburb': { in: suburbs } }) as Property[];
  return getPropertiesWithRangeMarkerFromList(properties, propertiesInSuburb);
};

export const getPropertiesWithRangeMarkerFromList = (properties: Property[], propertiesInSuburb: Property[]): Property[] => {
  const suburbs = _.uniq(properties.map(prop => prop.address.suburb));
  const averagePricesBySuburb: Record<string, number> = {};

  for (const suburb of suburbs) {
    averagePricesBySuburb[suburb] = getAveragePrice(propertiesInSuburb.filter(prop => prop.address.suburb === suburb));
  }

  return properties.map((property) => {
    const averageSuburbPrice = averagePricesBySuburb[property.address.suburb];
    let priceRangeMarker = getPropertyRangeMarker(property, averageSuburbPrice);
    return {
      ...property,
      averageSuburbPrice,
      priceRangeMarker,
    };
  });
}

