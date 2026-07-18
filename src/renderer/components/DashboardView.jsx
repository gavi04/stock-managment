function MetricCard({ title, value, tone = 'neutral' }) {
  return (
    <article className="metric-card">
      <p>{title}</p>
      <h3 className={`metric-${tone}`}>{value}</h3>
    </article>
  );
}

export function DashboardView({ summary, vouchers }) {
  const lowStock = summary?.lowStockItems ?? [];

  return (
    <div className="dashboard-grid">
      <section className="cards-row">
        <MetricCard title="Today's Stock-In" value={`+${Number(summary?.todayStockIn ?? 0).toFixed(3)}`} tone="good" />
        <MetricCard title="Today's Stock-Out" value={`-${Number(summary?.todayStockOut ?? 0).toFixed(3)}`} tone="bad" />
        <MetricCard title="Items Below Reorder Level" value={String(summary?.lowStockCount ?? 0)} tone="warn" />
      </section>

      <section className="panel">
        <h2>Low Stock Items</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.length === 0 ? (
              <tr>
                <td colSpan={3}>No items below reorder level.</td>
              </tr>
            ) : (
              lowStock.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{Number(item.current_stock).toFixed(3)}</td>
                  <td>{Number(item.min_stock).toFixed(3)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <h2>Recent Vouchers</h2>
        <table>
          <thead>
            <tr>
              <th>Voucher No</th>
              <th>Type</th>
              <th>Date</th>
              <th>Party</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.length === 0 ? (
              <tr>
                <td colSpan={6}>No vouchers yet.</td>
              </tr>
            ) : (
              vouchers.map((voucher) => (
                <tr key={voucher.voucher_no}>
                  <td>{voucher.voucher_no}</td>
                  <td>{voucher.type}</td>
                  <td>{new Date(voucher.date).toLocaleString()}</td>
                  <td>{voucher.party}</td>
                  <td>{Number(voucher.total).toFixed(2)}</td>
                  <td>{voucher.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}