export const generateQueryPayload = (propertyParams: any) => {
  const minPrice = propertyParams.minPrice ? Number(propertyParams.minPrice) : undefined;
  const maxPrice = propertyParams.maxPrice ? Number(propertyParams.maxPrice) : undefined;
  const suburb = propertyParams.suburb as string | undefined;
  const city = propertyParams.city as string | undefined;

  const queryPayload = {
    ...(minPrice || maxPrice ? {
      price: {
        ...minPrice !== undefined ? { min: minPrice } : {},
        ...maxPrice !== undefined ? { max: maxPrice } : {},
      }
    } : {}),
    ...(suburb ? { 'address.suburb': suburb } : {}),
    ...(city ? { 'address.city': city } : {}),
  };
  return queryPayload;
}

