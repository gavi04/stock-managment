import { useEffect, useState } from 'react';

const ICONS = {
  dashboard: 'M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z',
  'stock-master': 'M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10',
  'party-master': 'M17 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM22 20v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11',
  'codes-units': 'M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1-.6-1.4V4a1 1 0 0 1 1-1h7.9a2 2 0 0 1 1.5.6l7.4 7.4a2 2 0 0 1 0 2.4ZM7.5 7.5h.01',
  'purchase-entry': 'M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
  'sale-entry': 'M12 21V9m0 0 4 4m-4-4-4 4M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2',
  'sale-return-entry': 'M9 14 4 9l5-5M4 9h11a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H8',
  'purchase-return-entry': 'M15 14l5-5-5-5M20 9H9a5 5 0 0 0-5 5v0a5 5 0 0 0 5 5h7',
  'production-entry': 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H7a1.6 1.6 0 0 0 1-1.5V1a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.5 1H23a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z',
  'issue-production': 'M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18v3h3l6.4-6.4a4 4 0 0 0 5.3-5.4l-2.8 2.8-2.1-2.1z',
  'daily-stock-summary': 'M3 3v18h18M7 15l3-3 3 3 5-6',
  'item-stock-ledger': 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01'
};

function NavIcon({ name }) {
  const d = ICONS[name];
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d ? <path d={d} /> : <circle cx="12" cy="12" r="4" />}
    </svg>
  );
}

const STORAGE_KEY = 'stockops.sidebarCollapsed';

export function AppShell({ navigation, activeKey, onNavigate, headerTitle, children, onLogout, user }) {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  const initials = (user?.fullName || 'U')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={`erp-layout${collapsed ? ' collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">S</div>
          <div className="brand-text">
            <h2>StockOps</h2>
            <p>Manufacturing Inventory</p>
          </div>
          <button
            type="button"
            className="collapse-toggle"
            onClick={() => setCollapsed((value) => !value)}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {collapsed ? <path d="M9 6l6 6-6 6" /> : <path d="M15 6l-6 6 6 6" />}
            </svg>
          </button>
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
                  title={collapsed ? item.label : undefined}
                >
                  <NavIcon name={item.key} />
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </section>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar" aria-hidden="true">{initials}</div>
            <span className="user-name">{user?.fullName}</span>
          </div>
          <button type="button" className="ghost-btn" onClick={onLogout} title="Logout">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            <span className="nav-label">Logout</span>
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
