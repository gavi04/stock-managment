import { useEffect } from 'react';
import { AuthForm } from './components/AuthForm.jsx';
import { useSessionStore } from './stores/sessionStore.js';
import { NAVIGATION, VIEW_LABELS } from './config/navigation.js';
import { AppShell } from './components/AppShell.jsx';
import { DashboardView } from './components/DashboardView.jsx';
import { MasterPanel } from './components/MasterPanel.jsx';
import { VoucherEntryPanel } from './components/VoucherEntryPanel.jsx';
import { StockMasterPanel } from './components/StockMasterPanel.jsx';

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
    const [productRows, partyRows, categoryRows, unitRows] = await Promise.all([
      window.stockOps.listMaster('product', {}),
      window.stockOps.listMaster('party', {}),
      window.stockOps.listMaster('category', {}),
      window.stockOps.listMaster('unit', {})
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
      await window.stockOps.createUser({
        fullName: values.fullName,
        username: values.username,
        password: values.password
      });
      await window.stockOps.getBootstrapStatus().then(setBootstrapStatus);
    } catch (bootstrapError) {
      setError(bootstrapError.message || 'Unable to create admin');
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

  const createProduct = async (payload) => {
    setBusy(true);
    setError(null);
    try {
      const productPayload = {
        ...payload,
        code: payload.code || `ITM-${Date.now().toString().slice(-6)}`
      };

      const created = await window.stockOps.createMaster('product', productPayload);

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
    } finally {
      setBusy(false);
    }
  };

  const updateProduct = async (id, payload) => {
    setBusy(true);
    setError(null);
    try {
      await window.stockOps.updateMaster('product', id, {
        ...payload,
        code: payload.code || `ITM-${String(id).padStart(4, '0')}`
      });
      await Promise.all([refreshMasters(), refreshDashboard()]);
    } catch (updateError) {
      setError(updateError.message || 'Unable to update product');
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
        <MasterPanel
          type="party"
          title="Party"
          rows={parties}
          onCreate={(values) => createMaster('party', values)}
          onDelete={(id) => deleteMaster('party', id)}
        />
      );
    }

    if (activeView === 'purchase-entry') {
      return (
        <VoucherEntryPanel
          title="Purchase Entry"
          products={products}
          parties={parties}
          onSubmitVoucher={(values) => postVoucher('purchase', values)}
          sign={1}
        />
      );
    }

    if (activeView === 'sale-entry') {
      return (
        <VoucherEntryPanel
          title="Sale Entry"
          products={products}
          parties={parties}
          onSubmitVoucher={(values) => postVoucher('sale', values)}
          sign={-1}
        />
      );
    }

    if (activeView === 'sale-return-entry') {
      return (
        <VoucherEntryPanel
          title="Sale Return Entry"
          products={products}
          parties={parties}
          onSubmitVoucher={(values) => postVoucher('sale_return', values)}
          sign={1}
        />
      );
    }

    if (activeView === 'purchase-return-entry') {
      return (
        <VoucherEntryPanel
          title="Purchase Return Entry"
          products={products}
          parties={parties}
          onSubmitVoucher={(values) => postVoucher('purchase_return', values)}
          sign={-1}
        />
      );
    }

    if (activeView === 'production-entry') {
      return (
        <VoucherEntryPanel
          title="Production Entry"
          products={products}
          parties={parties}
          onSubmitVoucher={(values) => postVoucher('production_in', values)}
          sign={1}
        />
      );
    }

    if (activeView === 'issue-production') {
      return (
        <VoucherEntryPanel
          title="Issue To Production"
          products={products}
          parties={parties}
          onSubmitVoucher={(values) => postVoucher('production_out', values)}
          sign={-1}
        />
      );
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
          />
          {error ? <p className="error-message">{error}</p> : null}
        </>
      )}
    </main>
  );
}