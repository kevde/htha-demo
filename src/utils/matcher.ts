import { RecordType } from "types";
import get from 'lodash/get';

export const matchNumberRange = (itemVal: unknown, range: { min?: number; max?: number }) => {
  const num = Number(itemVal);
  if (Number.isNaN(num)) return false;
  if (range.min !== undefined && num < range.min) return false;
  if (range.max !== undefined && num > range.max) return false;
  return true;
};

export const matchAttributes = (item: RecordType, attrs: Partial<RecordType>) => {
  for (const [key, val] of Object.entries(attrs)) {
    const itemVal = get(item, key);

    const isNumericRangeValue = val && typeof val === 'object' && ('min' in val || 'max' in val);
    const isInListValue = val && typeof val === 'object' && 'in' in val;

    if (isInListValue) {
      const valList = (val as any).in;
      if (!Array.isArray(valList)) return false;
      if (!valList.includes(itemVal)) return false;
      continue;
    }

    if (isNumericRangeValue) {
      if (!matchNumberRange(itemVal, val as any)) return false;
      continue;
    }

    // direct equality otherwise
    if (itemVal !== val) return false;
  }
  return true;
};
