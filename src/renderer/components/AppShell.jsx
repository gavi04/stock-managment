export function AppShell({ navigation, activeKey, onNavigate, headerTitle, children, onLogout, user }) {
  return (
    <div className="erp-layout">
      <aside className="sidebar">
        <div className="brand-block">
          <h2>StockOps</h2>
          <p>Manufacturing Inventory</p>
        </div>

        <nav className="side-nav">
          {navigation.map((group) => (
            <section key={group.title} className="nav-group">
              <p className="group-label">{group.title}</p>
              {group.items.map((item) => (
                <button
                  key={item.key}
                  className={`nav-item ${activeKey === item.key ? 'active' : ''}`}
                  type="button"
                  onClick={() => onNavigate(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </section>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>{user?.fullName}</p>
          <button type="button" className="ghost-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="content-area">
        <header className="content-header">
          <h1>{headerTitle}</h1>
          <p>Overview as of {new Date().toLocaleDateString()}</p>
        </header>
        {children}
      </main>
    </div>
  );
}