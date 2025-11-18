import * as yup from 'yup';

const addressSchema = yup.object({
  street: yup.string().required('street is a required field'),
  city: yup.string().required('city is a required field'),
  state: yup.string().required('state is a required field'),
  zipCode: yup.string().required('zipCode is a required field'),
  suburb: yup.string().optional(),
});

const propertySchema = yup.object({
  title: yup.string().required('title is a required field'),
  description: yup.string().optional(),
  price: yup.number().required('price is a required field').min(0),
  address: addressSchema.required('address is a required field'),
});

export const validateRequest = (params: any): { valid: boolean; errors?: string[] } => {
  try {
    // Validate synchronously and collect all errors
    propertySchema.validateSync(params, { abortEarly: false, stripUnknown: true });
    return { valid: true };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return { valid: false, errors: err.errors };
    }
    return { valid: false, errors: [(err as Error).message] };
  }
};

export default validateRequest;
