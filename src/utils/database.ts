import { RecordType } from '../types';
import crypto from 'crypto';
import { matchAttributes } from './matcher';

const store = new Map<string, RecordType>();

export const reset = () => {
  store.clear();
};

export const create = async (record: Partial<RecordType>): Promise<RecordType> => {
  const providedId = (record as any).id;
  const key = providedId !== undefined ? String(providedId) : (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
  const toStore = { ...record, id: String(key) } as RecordType;
  store.set(String(key), toStore);
  return providedId !== undefined ? ({ ...record, id: providedId } as RecordType) : { ...toStore };
};

export const query = async (attributes: Partial<RecordType>): Promise<RecordType[]> => {
  const attrs = attributes || {};
  const items = Array.from(store.values());
  if (Object.keys(attrs).length === 0) return items.map(v => ({ ...v }));
  return items.filter(v => matchAttributes(v, attrs)).map(v => ({ ...v }));
};

export const read = async (recordAttributes: Partial<RecordType>): Promise<RecordType | null> => {
  if (!recordAttributes || typeof recordAttributes.id !== 'string') return null;
  const found = store.get(recordAttributes.id as string) || null;
  return found ? { ...found } : null;
};

export const update = async (recordAttributes: RecordType): Promise<RecordType> => {
  const existing = store.get(recordAttributes.id) || {};
  const updated = { ...existing, ...recordAttributes } as RecordType;
  store.set(recordAttributes.id, updated);
  return { ...updated };
};

export const remove = async (recordAttributes: Partial<RecordType>): Promise<void> => {
  if (!recordAttributes || typeof recordAttributes.id !== 'string') return;
  store.delete(recordAttributes.id);
  return;
};


