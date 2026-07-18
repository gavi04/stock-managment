import { LookupRepository } from './lookupRepository.js';

export const categoriesRepository = new LookupRepository('categories');
export const unitsRepository = new LookupRepository('units');
export const warehousesRepository = new LookupRepository('warehouses');
export const partiesRepository = new LookupRepository('parties');
export const productsRepository = new LookupRepository('products');