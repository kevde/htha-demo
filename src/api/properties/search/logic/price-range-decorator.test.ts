import { after, before } from 'lodash';
import { SampleProperties } from '../test/fixtures';
import { getAveragePrice, getPropertiesWithRangeMarker, getPropertiesWithRangeMarkerFromList } from './price-range-decorator';
import * as dbUtils from 'utils/database';
import { Property } from 'types';

describe('PriceRangeDecorator', () => {
  const propertiesInQuestion = SampleProperties.slice(0, 3);

  beforeAll(async () => {
    await dbUtils.reset();
    await dbUtils.create(SampleProperties[0]);
    await dbUtils.create(SampleProperties[1]);
    await dbUtils.create(SampleProperties[2]);
    await dbUtils.create(SampleProperties[3]);
    await dbUtils.create(SampleProperties[4]);
  });

  afterAll(async () => {
    await dbUtils.reset();
  });


  it('should generate an average price range for a list of properties', () => {
    const averagePrice = getAveragePrice(propertiesInQuestion);
    expect(averagePrice).toBe(200000);
  });

  it('should decorate property with a price range marker based on the average price', async () => {
    const propertiesWithRangeMarker = await getPropertiesWithRangeMarkerFromList(propertiesInQuestion, SampleProperties);
    expect(propertiesWithRangeMarker).toEqual([
      { ...SampleProperties[0], averageSuburbPrice: 100000, priceRangeMarker: 'Average' },
      { ...SampleProperties[1], averageSuburbPrice: 200000, priceRangeMarker: 'Average' },
      { ...SampleProperties[2], averageSuburbPrice: 400000, priceRangeMarker: 'Below Average' },
    ]);
  });

  it(`should generate priceRangeMarker of a property based on the other property's suburb`, async () => {
    const suburbProperty = SampleProperties[4]; // Hollywood property priced at 500000
    const propertiesWithRangeMarker = await getPropertiesWithRangeMarker([suburbProperty!]);
    const decoratedSuburbProperty = propertiesWithRangeMarker.find(
      (property: Property) => property.address.suburb === 'Hollywood'
    );

    expect(decoratedSuburbProperty).toBeDefined();
    expect(decoratedSuburbProperty!.priceRangeMarker).toBe('Above Average');
  });
});
