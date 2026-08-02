import { LookupRepository } from './lookupRepository.js';

export const categoriesRepository = new LookupRepository('category');
export const unitsRepository = new LookupRepository('unit');
export const warehousesRepository = new LookupRepository('warehouse');
export const partiesRepository = new LookupRepository('party');
export const productsRepository = new LookupRepository('product');
export const hsnRepository = new LookupRepository('hsn', ['code', 'description']);
export const productionFormulasRepository = new LookupRepository('productionFormula', ['name', 'code']);
