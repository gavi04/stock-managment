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
      { key: 'codes-units', label: 'Codes & Units' }
    ]
  },
  {
    title: 'Stock-In',
    items: [
      { key: 'purchase-entry', label: 'Purchase Entry' },
      { key: 'sale-return-entry', label: 'Sale Return Entry' },
      { key: 'production-entry', label: 'Production Entry' }
    ]
  },
  {
    title: 'Stock-Out',
    items: [
      { key: 'sale-entry', label: 'Sale Entry' },
      { key: 'purchase-return-entry', label: 'Purchase Return Entry' },
      { key: 'issue-production', label: 'Issue to Production' }
    ]
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
  'purchase-entry': 'Purchase Entry',
  'sale-return-entry': 'Sale Return Entry',
  'production-entry': 'Production Entry',
  'sale-entry': 'Sale Entry',
  'purchase-return-entry': 'Purchase Return Entry',
  'issue-production': 'Issue To Production',
  'daily-stock-summary': 'Daily Stock Summary',
  'item-stock-ledger': 'Item Stock Ledger'
};