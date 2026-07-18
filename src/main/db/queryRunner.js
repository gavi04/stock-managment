import { getDatabase } from './database.js';

export function runQuery(sql, params = {}) {
  return getDatabase().prepare(sql).run(params);
}

export function getOne(sql, params = {}) {
  return getDatabase().prepare(sql).get(params) ?? null;
}

export function getAll(sql, params = {}) {
  return getDatabase().prepare(sql).all(params);
}

export function runTransaction(callback) {
  return getDatabase().transaction(callback)();
}