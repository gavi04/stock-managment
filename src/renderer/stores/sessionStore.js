import { create } from 'zustand';

export const useSessionStore = create((set) => ({
  bootstrapStatus: { needsBootstrap: false },
  user: null,
  activeView: 'dashboard',
  dashboard: {
    todayStockIn: 0,
    todayStockOut: 0,
    lowStockCount: 0,
    lowStockItems: []
  },
  vouchers: [],
  products: [],
  parties: [],
  categories: [],
  units: [],
  busy: false,
  error: null,
  setBootstrapStatus: (bootstrapStatus) => set({ bootstrapStatus }),
  setUser: (user) => set({ user, error: null }),
  setActiveView: (activeView) => set({ activeView }),
  setDashboard: (dashboard) => set({ dashboard }),
  setVouchers: (vouchers) => set({ vouchers }),
  setProducts: (products) => set({ products }),
  setParties: (parties) => set({ parties }),
  setCategories: (categories) => set({ categories }),
  setUnits: (units) => set({ units }),
  setBusy: (busy) => set({ busy }),
  setError: (error) => set({ error })
}));