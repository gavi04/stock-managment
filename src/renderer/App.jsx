import { useEffect } from 'react';
import { AuthForm } from './components/AuthForm.jsx';
import { useSessionStore } from './stores/sessionStore.js';
import { NAVIGATION, VIEW_LABELS } from './config/navigation.js';
import { AppShell } from './components/AppShell.jsx';
import { DashboardView } from './components/DashboardView.jsx';
import { MasterPanel } from './components/MasterPanel.jsx';
import { VoucherEntryPanel } from './components/VoucherEntryPanel.jsx';
import { PurchaseVoucherPanel } from './components/PurchaseVoucherPanel.jsx';
import { SaleReturnVoucherPanel } from './components/SaleReturnVoucherPanel.jsx';
import { SaleVoucherPanel } from './components/SaleVoucherPanel.jsx';
import { PurchaseReturnVoucherPanel } from './components/PurchaseReturnVoucherPanel.jsx';
import { ProductionVoucherPanel } from './components/ProductionVoucherPanel.jsx';
import { StockMasterPanel } from './components/StockMasterPanel.jsx';
import { PartyMasterPanel } from './components/PartyMasterPanel.jsx';
import { CodesUnitsPanel } from './components/CodesUnitsPanel.jsx';
import { ProductionFormulaPanel } from './components/ProductionFormulaPanel.jsx';
import { ItemLedgerPanel } from './components/ItemLedgerPanel.jsx';
import { DailyStockSummaryPanel } from './components/DailyStockSummaryPanel.jsx';
import { DataImportPanel } from './components/DataImportPanel.jsx';

export default function App() {
  const {
    bootstrapStatus,
    user,
    activeView,
    dashboard,
    vouchers,
    products,
    parties,
    categories,
    units,
    formulas,
    busy,
    error,
    setBootstrapStatus,
    setUser,
    setActiveView,
    setDashboard,
    setVouchers,
    setProducts,
    setParties,
    setCategories,
    setUnits,
    setFormulas,
    setBusy,
    setError
  } = useSessionStore();

  useEffect(() => {
    window.stockOps?.getBootstrapStatus?.().then(setBootstrapStatus).catch(() => undefined);
  }, []);

  const refreshDashboard = async () => {
    const [summary, recent] = await Promise.all([
      window.stockOps.getDashboardSummary(),
      window.stockOps.getRecentVouchers(10)
    ]);
    setDashboard(summary);
    setVouchers(recent);
  };

  const refreshMasters = async () => {
    // HSN (~21k) is not loaded up-front; it's searched on demand in the pickers.
    const [productRows, partyRows, categoryRows, unitRows, formulaRows] = await Promise.all([
      window.stockOps.listMaster('product', {}),
      window.stockOps.listMaster('party', {}),
      window.stockOps.listMaster('category', {}),
      window.stockOps.listMaster('unit', { pageSize: 1000 }),
      window.stockOps.listMaster('formula', { pageSize: 1000 })
    ]);

    const productsWithStock = await Promise.all(
      productRows.map(async (row) => {
        const balance = await window.stockOps.getStockBalance(row.id, 1);
        return { ...row, current_stock: balance };
      })
    );

    setProducts(productsWithStock);
    setParties(partyRows);
    setCategories(categoryRows);
    setUnits(unitRows);
    setFormulas(formulaRows);
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    Promise.all([refreshDashboard(), refreshMasters()]).catch((loadError) => {
      setError(loadError.message || 'Unable to load dashboard data');
    });
  }, [user]);

  const handleLogin = async (values) => {
    setBusy(true);
    setError(null);
    try {
      const account = await window.stockOps.login(values);
      setUser(account);
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in');
    } finally {
      setBusy(false);
    }
  };

  const handleBootstrap = async (values) => {
    setBusy(true);
    setError(null);
    try {
      const result = await window.stockOps.createUser({
        fullName: values.fullName,
        username: values.username,
        password: values.password
      });
      await window.stockOps.getBootstrapStatus().then(setBootstrapStatus);
      return result?.recoveryCode ?? null; // shown once by AuthForm
    } catch (bootstrapError) {
      setError(bootstrapError.message || 'Unable to create admin');
      return null;
    } finally {
      setBusy(false);
    }
  };

  const handleResetPassword = async (values) => {
    setBusy(true);
    setError(null);
    try {
      const result = await window.stockOps.resetPassword(values);
      return result?.recoveryCode ?? null; // new code shown once by AuthForm
    } catch (resetError) {
      setError(resetError.message || 'Unable to reset password');
      return null;
    } finally {
      setBusy(false);
    }
  };

  const createMaster = async (entity, payload) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.createMaster(entity, payload);
      await refreshMasters();
      if (entity === 'product') {
        await refreshDashboard();
      }
    } catch (createError) {
      setError(createError.message || 'Unable to create record');
    } finally {
      setBusy(false);
    }
  };

  const updateMasterRecord = async (entity, id, payload) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.updateMaster(entity, id, payload);
      await refreshMasters();
    } catch (err) {
      setError(err.message || 'Unable to update record');
    } finally {
      setBusy(false);
    }
  };

  const createProduct = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      // Item code is auto-generated in the form (name/size/length) and editable;
      // if left blank the main process fills it with the same rule.
      const created = await window.stockOps.createMaster('product', payload);

      if (Number(payload.opening_qty || 0) > 0) {
        await window.stockOps.recordStockTransaction({
          transaction_no: `OB-${Date.now()}`,
          source_type: 'stock_master',
          source_id: created.id,
          transaction_type: 'opening_balance',
          product_id: created.id,
          warehouse_id: 1,
          party_id: null,
          quantity: Number(payload.opening_qty),
          rate: Number(payload.opening_rate || 0),
          amount: Number(payload.opening_qty) * Number(payload.opening_rate || 0),
          reference_no: payload.opening_date || null,
          notes: 'Opening stock from stock master'
        });
      }

      await Promise.all([refreshMasters(), refreshDashboard()]);
    } catch (createError) {
      setError(createError.message || 'Unable to create product');
      throw createError; // surface to the Stock Master form (e.g. duplicate code)
    } finally {
      setBusy(false);
    }
  };

  const updateProduct = async (id, payload) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.updateMaster('product', id, payload);
      await Promise.all([refreshMasters(), refreshDashboard()]);
    } catch (updateError) {
      setError(updateError.message || 'Unable to update product');
      throw updateError; // surface to the Stock Master form
    } finally {
      setBusy(false);
    }
  };

  const deleteMaster = async (entity, id) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.deleteMaster(entity, id);
      await refreshMasters();
      if (entity === 'product') {
        await refreshDashboard();
      }
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete record');
    } finally {
      setBusy(false);
    }
  };

  const postVoucher = async (transactionType, payload) => {
    setBusy(true);
    setError(null);
    try {
      const amount = Number(payload.quantity) * Number(payload.rate || 0);
      await window.stockOps.recordStockTransaction({
        transaction_no: `TX-${Date.now()}`,
        source_type: transactionType,
        source_id: null,
        transaction_type: transactionType,
        product_id: Number(payload.product_id),
        warehouse_id: 1,
        party_id: payload.party_id ? Number(payload.party_id) : null,
        quantity: Number(payload.quantity),
        rate: Number(payload.rate || 0),
        amount,
        reference_no: null,
        notes: payload.notes || null
      });
      await Promise.all([refreshDashboard(), refreshMasters()]);
    } catch (voucherError) {
      setError(voucherError.message || 'Unable to post voucher');
    } finally {
      setBusy(false);
    }
  };

  // Edit a saved voucher: replaces its lines + stock movements, keeps its number.
  const updateVoucherOfType = async (type, id, payload, label) => {
    setBusy(true);
    setError(null);
    try {
      const saved = await window.stockOps.updateVoucher(type, id, payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
      return saved;
    } catch (voucherError) {
      setError(voucherError.message || `Unable to update ${label}`);
      return undefined;
    } finally {
      setBusy(false);
    }
  };

  const postPurchaseVoucher = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      const saved = await window.stockOps.savePurchaseVoucher(payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
      return saved; // { id, voucher_no } — used by "Save & Print"
    } catch (voucherError) {
      setError(voucherError.message || 'Unable to save purchase voucher');
      return undefined;
    } finally {
      setBusy(false);
    }
  };

  const postSaleReturnVoucher = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      const saved = await window.stockOps.saveSaleReturnVoucher(payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
      return saved;
    } catch (voucherError) {
      setError(voucherError.message || 'Unable to save sale return voucher');
      return undefined;
    } finally {
      setBusy(false);
    }
  };

  const postProductionVoucher = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.saveProductionVoucher(payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
    } catch (voucherError) {
      setError(voucherError.message || 'Unable to save production voucher');
    } finally {
      setBusy(false);
    }
  };

  const postSaleVoucher = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      const saved = await window.stockOps.saveSaleVoucher(payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
      return saved;
    } catch (voucherError) {
      setError(voucherError.message || 'Unable to save sale voucher');
      return undefined;
    } finally {
      setBusy(false);
    }
  };

  const postPurchaseReturnVoucher = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      const saved = await window.stockOps.savePurchaseReturnVoucher(payload);
      await Promise.all([refreshDashboard(), refreshMasters()]);
      return saved;
    } catch (voucherError) {
      setError(voucherError.message || 'Unable to save purchase return voucher');
      return undefined;
    } finally {
      setBusy(false);
    }
  };

  const renderView = () => {
    if (activeView === 'dashboard') {
      return <DashboardView summary={dashboard} vouchers={vouchers} />;
    }

    if (activeView === 'stock-master') {
      return (
        <StockMasterPanel
          products={products}
          categories={categories}
          units={units}
          busy={busy}
          onCreate={createProduct}
          onUpdate={updateProduct}
          onDelete={(id) => deleteMaster('product', id)}
        />
      );
    }

    if (activeView === 'party-master') {
      return (
        <PartyMasterPanel
          rows={parties}
          busy={busy}
          onCreate={(values) => createMaster('party', values)}
          onUpdate={(id, values) => updateMasterRecord('party', id, values)}
          onDelete={(id) => deleteMaster('party', id)}
        />
      );
    }

    if (activeView === 'codes-units') {
      return <CodesUnitsPanel units={units} onRefresh={refreshMasters} />;
    }

    if (activeView === 'data-import') {
      return <DataImportPanel onRefresh={refreshMasters} />;
    }

    if (activeView === 'production-formula') {
      return <ProductionFormulaPanel formulas={formulas} products={products} onRefresh={refreshMasters} />;
    }

    if (activeView === 'purchase-entry') {
      return (
        <PurchaseVoucherPanel
          products={products}
          parties={parties}
          busy={busy}
          onSave={postPurchaseVoucher}
          onUpdate={(id, payload) => updateVoucherOfType('purchase', id, payload, 'purchase voucher')}
        />
      );
    }

    if (activeView === 'sale-entry') {
      return (
        <SaleVoucherPanel
          products={products}
          parties={parties}
          busy={busy}
          onSave={postSaleVoucher}
          onUpdate={(id, payload) => updateVoucherOfType('sale', id, payload, 'sale voucher')}
        />
      );
    }

    if (activeView === 'sale-return-entry') {
      return (
        <SaleReturnVoucherPanel
          products={products}
          parties={parties}
          busy={busy}
          onSave={postSaleReturnVoucher}
          onUpdate={(id, payload) => updateVoucherOfType('sale_return', id, payload, 'sale return voucher')}
        />
      );
    }

    if (activeView === 'purchase-return-entry') {
      return (
        <PurchaseReturnVoucherPanel
          products={products}
          parties={parties}
          busy={busy}
          onSave={postPurchaseReturnVoucher}
          onUpdate={(id, payload) => updateVoucherOfType('purchase_return', id, payload, 'purchase return voucher')}
        />
      );
    }

    if (activeView === 'production-entry') {
      return (
        <ProductionVoucherPanel
          products={products}
          formulas={formulas}
          busy={busy}
          onSave={postProductionVoucher}
        />
      );
    }

    if (activeView === 'item-stock-ledger') {
      return <ItemLedgerPanel products={products} />;
    }

    if (activeView === 'daily-stock-summary') {
      return <DailyStockSummaryPanel products={products} categories={categories} />;
    }

    return (
      <section className="panel">
        <h2>{VIEW_LABELS[activeView]}</h2>
        <p>This section is scaffolded and ready for the next implementation increment.</p>
      </section>
    );
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView('dashboard');
  };

  return (
    <main className={user ? 'workspace-shell' : 'auth-shell'}>
      {user ? (
        <AppShell
          navigation={NAVIGATION}
          activeKey={activeView}
          onNavigate={setActiveView}
          headerTitle={VIEW_LABELS[activeView]}
          onLogout={handleLogout}
          user={user}
        >
          {renderView()}
        </AppShell>
      ) : (
        <>
          <AuthForm
            needsBootstrap={bootstrapStatus.needsBootstrap}
            busy={busy}
            onLogin={handleLogin}
            onBootstrap={handleBootstrap}
            onReset={handleResetPassword}
          />
          {error ? <p className="error-message">{error}</p> : null}
        </>
      )}
    </main>
  );
}