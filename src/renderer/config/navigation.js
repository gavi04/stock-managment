export const NAVIGATION = [
  {
    title: 'Dashboard',
    items: [{ key: 'dashboard', label: 'Dashboard' }]
  },
  {
    title: 'Masters',
    items: [
      { key: 'stock-master', label: 'Stock Master' },
      { key: 'party-master', label: 'Party Master' },
      { key: 'codes-units', label: 'Codes & Units' },
      { key: 'production-formula', label: 'Production Formulas' },
      { key: 'data-import', label: 'Import from Excel' }
    ]
  },
  {
    title: 'Stock-In',
    items: [
      { key: 'purchase-entry', label: 'Purchase Entry' },
      { key: 'sale-return-entry', label: 'Sale Return Entry' }
    ]
  },
  {
    title: 'Stock-Out',
    items: [
      { key: 'sale-entry', label: 'Sale Entry' },
      { key: 'purchase-return-entry', label: 'Purchase Return Entry' }
    ]
  },
  {
    title: 'Manufacturing',
    items: [{ key: 'production-entry', label: 'Production' }]
  },
  {
    title: 'Reports',
    items: [
      { key: 'daily-stock-summary', label: 'Daily Stock Summary' },
      { key: 'item-stock-ledger', label: 'Item Stock Ledger' }
    ]
  }
];

export const VIEW_LABELS = {
  dashboard: 'Dashboard',
  'stock-master': 'Stock Master',
  'party-master': 'Party Master',
  'codes-units': 'Codes & Units',
  'production-formula': 'Production Formulas',
  'data-import': 'Import from Excel',
  'purchase-entry': 'Purchase Entry',
  'sale-return-entry': 'Sale Return Entry',
  'production-entry': 'Production',
  'sale-entry': 'Sale Entry',
  'purchase-return-entry': 'Purchase Return Entry',
  'daily-stock-summary': 'Daily Stock Summary',
  'item-stock-ledger': 'Item Stock Ledger'
};
