export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  address: Address;
  priceRangeMarker?: string;
  averageSuburbPrice?: number;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  suburb: string;
};

export type RecordType = {
  id: string;
  [key: string]: any;
};

export type ValidationResult = {
  valid: boolean;
  errors?: string[];
};
