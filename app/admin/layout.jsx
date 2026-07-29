'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLang } from '../../lib/i18n';
import LangToggle from '../../components/LangToggle';
import Icon from '../../components/Icons';


const NAV = [
  { group: 'operations', items: [
    { href: '/admin', key: 'dashboard', icon: 'dashboard' },
    { href: '/admin/bookings', key: 'bookings', icon: 'calendar' },
    { href: '/admin/calendar', key: 'calendar', icon: 'area' },
    { href: '/admin/rent', key: 'rent', icon: 'bed' },
    { href: '/admin/rooms', key: 'rooms', icon: 'home' },
    { href: '/admin/guests', key: 'guests', icon: 'users' },
  ]},
  { group: 'guestcare', items: [
    { href: '/admin/frontdesk', key: 'frontdesk', icon: 'bell' },
    { href: '/admin/prebooking', key: 'prebooking', icon: 'clock' },
    { href: '/admin/dues', key: 'dues', icon: 'alert' },
    { href: '/admin/membership', key: 'membership', icon: 'star' },
    { href: '/admin/feedback', key: 'feedback', icon: 'heart' },
  ]},
  { group: 'resort', items: [
    { href: '/admin/housekeeping', key: 'housekeeping', icon: 'broom' },
    { href: '/admin/pos', key: 'pos', icon: 'dining' },
    { href: '/admin/inventory', key: 'inventory', icon: 'box' },
    { href: '/admin/staff', key: 'staff', icon: 'shield' },
    { href: '/admin/hr', key: 'hr', icon: 'wallet' },
    { href: '/admin/finance', key: 'finance', icon: 'taka' },
    { href: '/admin/cms', key: 'cms', icon: 'globe' },
    { href: '/admin/reports', key: 'reports', icon: 'chart' },
    { href: '/admin/settings', key: 'settings', icon: 'settings' },
    { href: '/admin/roles', key: 'roles', icon: 'shield' },
  ]},
];

const DEFAULT_ROLES = {
  superadmin: null,
  gm: ['dashboard', 'bookings', 'calendar', 'rent', 'rooms', 'guests', 'frontdesk', 'prebooking', 'dues', 'membership', 'feedback', 'housekeeping', 'pos', 'inventory', 'staff', 'hr', 'finance', 'cms', 'reports', 'settings'],
  frontdesk: ['dashboard', 'bookings', 'calendar', 'rent', 'rooms', 'guests', 'frontdesk', 'prebooking', 'dues', 'membership', 'feedback', 'pos'],
  housekeeping: ['housekeeping', 'rooms', 'inventory', 'staff'],
};

function getPageKey(pathname) {
  if (pathname === '/admin') return 'dashboard';
  const match = pathname.match(/^\/admin\/([^\/]+)/);
  return match ? match[1] : null;
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('gm');
  const [permissions, setPermissions] = useState(DEFAULT_ROLES);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setLoggingOut(false);
    try {
      const savedRole = localStorage.getItem('cumilla-role') || 'gm';
      setRole(savedRole);

      const savedPermissions = localStorage.getItem('cumilla-role-permissions');
      if (savedPermissions) {
        setPermissions(JSON.parse(savedPermissions));
      } else {
        localStorage.setItem('cumilla-role-permissions', JSON.stringify(DEFAULT_ROLES));
        setPermissions(DEFAULT_ROLES);
      }
    } catch {
      /* fallback */
    }

    async function verifySession() {
      try {
        const res = await fetch('/api/me');
        if (!res.ok) {
          // Not authenticated — middleware should have redirected,
          // but handle edge case for client-side navigation
          if (pathname !== '/admin/login') {
            router.push('/admin/login');
          }
          return;
        }

        const { user } = await res.json();
        if (user && user.role_key) {
          setRole(user.role_key);
          try { localStorage.setItem('cumilla-role', user.role_key); } catch { /* ignore */ }
        }
      } catch (err) {
        console.error('[Cumilla] Session check error:', err);
      }
    }

    verifySession();
  }, [pathname, router]);

  const allowed = permissions[role] !== undefined ? permissions[role] : DEFAULT_ROLES[role];
  
  const nav = NAV
    .map((g) => ({ ...g, items: allowed ? g.items.filter((i) => allowed.includes(i.key)) : g.items }))
    .filter((g) => g.items.length > 0);

  // Login screen renders without the admin chrome
  if (pathname === '/admin/login') return children;

  // Route guarding check
  const pageKey = getPageKey(pathname);
  const isAuthorized = allowed === null || (allowed && pageKey && allowed.includes(pageKey));

  return (
    <div className="app">
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <Link className="side-logo" href="/">
          <Icon name="leaf" size={26} stroke={1.6} />
          {t('brand.name')}
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--sage)', alignSelf: 'flex-end', marginBottom: 5 }}>OS</span>
        </Link>
        {nav.map((g) => (
          <div key={g.group}>
            <div className="side-label">{t(`admin.sidebar.${g.group}`)}</div>
            {g.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`side-link${pathname === item.href ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <Icon name={item.icon} size={19} />
                {t(`admin.sidebar.${item.key}`)}
              </Link>
            ))}
          </div>
        ))}
        <div className="side-foot">
          <Link href="/" className="side-link">
            <Icon name="globe" size={19} />
            {t('admin.sidebar.viewSite')}
          </Link>
          <button className="side-link" onClick={async () => {
            setLoggingOut(true);
            try { localStorage.removeItem('cumilla-role'); } catch { /* ignore */ }
            try { await fetch('/api/logout', { method: 'POST' }); } catch { /* ignore */ }
            router.push('/admin/login');
          }}>
            <Icon name="logout" size={19} />
            {t('admin.sidebar.signOut')}
          </button>
        </div>
      </aside>
      <div className={`scrim${open ? ' show' : ''}`} onClick={() => setOpen(false)} />
      <main className="main">
        <div className="mobile-bar">
          <button className="icon-btn" onClick={() => setOpen(true)} aria-label="Open menu">
            <Icon name="menu" size={20} stroke={2} />
          </button>
          <div className="search">
            <Icon name="search" size={16} stroke={2} />
            <input placeholder={t('common.search')} aria-label={t('common.search')} />
          </div>
          <LangToggle dark />
        </div>
        
        {isAuthorized ? (
          children
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '70vh', padding: 24, textAlign: 'center'
          }}>
            <div style={{
              background: 'rgba(192,69,44,.10)', color: 'var(--red)', width: 64, height: 64,
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20
            }}>
              <Icon name="alert" size={32} stroke={2} />
            </div>
            <h1 className="serif" style={{ fontSize: '2rem', color: 'var(--forest)', marginBottom: 8 }}>
              Access Denied / প্রবেশাধিকার নেই
            </h1>
            <p style={{ color: 'var(--muted)', maxWidth: 400, marginBottom: 24, fontSize: '.95rem' }}>
              You do not have permission to access this page. Please contact a Super Admin if you believe this is an error.<br />
              (এই পেজে প্রবেশ করার অনুমতি আপনার নেই। অনুগ্রহ করে সুপার এডমিনের সাথে যোগাযোগ করুন।)
            </p>
            <button className="btn btn-gold" onClick={() => router.push(allowed && allowed.includes('dashboard') ? '/admin' : (allowed && allowed.length ? `/admin/${allowed[0]}` : '/'))}>
              Back to Dashboard / ড্যাশবোর্ডে ফিরে যান
            </button>
          </div>
        )}
      </main>

      {loggingOut && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(14, 33, 25, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          color: '#fff',
          animation: 'fadeIn 0.25s ease'
        }}>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .spinner {
              width: 50px;
              height: 50px;
              border: 3px solid rgba(255, 255, 255, 0.15);
              border-top: 3px solid var(--gold, #C9A227);
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
              margin-bottom: 20px;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
          <div className="spinner"></div>
          <div style={{ fontFamily: 'var(--font-head), serif', fontSize: '1.25rem', fontWeight: 600 }}>
            Signing Out / সাইন আউট হচ্ছে…
          </div>
        </div>
      )}
    </div>
  );
}
