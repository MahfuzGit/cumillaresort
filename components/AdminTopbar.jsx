'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '../lib/i18n';
import { adminNotifications } from '../lib/data';
import LangToggle from './LangToggle';
import Icon from './Icons';

const ROLE_PROFILE = {
  gm: { name: 'Maya Rahman', avatar: 5, roleKey: 'admin.login.roleGm' },
  frontdesk: { name: 'Joynal Abedin', avatar: 53, roleKey: 'admin.login.roleFrontdesk' },
  housekeeping: { name: 'Shapla Begum', avatar: 22, roleKey: 'admin.login.roleHousekeeping' },
};

const NOTIF_STYLE = {
  booking: { icon: 'calendar', bg: 'rgba(30,142,90,.12)', color: 'var(--green)' },
  complaint: { icon: 'alert', bg: 'rgba(192,69,44,.12)', color: 'var(--red)' },
  due: { icon: 'taka', bg: 'rgba(185,123,15,.13)', color: 'var(--amber)' },
  checkin: { icon: 'users', bg: 'rgba(45,108,181,.12)', color: 'var(--blue)' },
  maintenance: { icon: 'settings', bg: 'rgba(192,69,44,.10)', color: 'var(--red)' },
  feedback: { icon: 'heart', bg: 'rgba(201,162,39,.14)', color: 'var(--gold)' },
};

export default function AdminTopbar({ title, sub }) {
  const { t, n, L } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState([]); // indexes marked read (persisted)
  const [role, setRole] = useState('gm');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cumilla-notif-read');
      if (raw) setRead(JSON.parse(raw));
      setRole(localStorage.getItem('cumilla-role') || 'gm');
    } catch { /* keep defaults */ }
  }, []);

  const profile = ROLE_PROFILE[role] || ROLE_PROFILE.gm;

  const saveRead = (next) => {
    setRead(next);
    try { localStorage.setItem('cumilla-notif-read', JSON.stringify(next)); } catch { /* ignore */ }
  };

  const isUnread = (item, i) => item.unread && !read.includes(i);
  const unreadCount = adminNotifications.filter(isUnread).length;

  const openItem = (item, i) => {
    if (!read.includes(i)) saveRead([...read, i]);
    setOpen(false);
    router.push(item.href);
  };

  return (
    <>
      {/* Visible only when printing — turns every page into a branded report */}
      <div className="print-header">
        <div className="ph-brand">{t('brand.full')}</div>
        <div className="ph-sub">{t('admin.print.brandLine')}</div>
        <div className="ph-meta">
          {title} — {sub} · {t('admin.print.generated')}: {n(10)}/{n(6)}/{n(2026)}
        </div>
      </div>

      <div className="topbar">
        <div>
          <h1 className="serif">{title}</h1>
          <div className="sub">{sub}</div>
        </div>
        <div className="top-right">
          <div className="search desk-search">
            <Icon name="search" size={16} stroke={2} />
            <input placeholder={t('admin.top.searchPh')} aria-label={t('common.search')} />
          </div>
          <LangToggle dark />
          <button className="btn-admin" onClick={() => window.print()} title={t('admin.print.btn')}>
            <Icon name="printer" size={15} stroke={2} /> {t('admin.print.btn')}
          </button>

          {/* Notification center */}
          <div className="notif-wrap">
            <button className="icon-btn" aria-label={t('admin.notif.title')} aria-expanded={open}
              style={{ position: 'relative' }} onClick={() => setOpen((o) => !o)}>
              <Icon name="bell" size={18} />
              {unreadCount > 0 && <span className="notif-count">{n(unreadCount)}</span>}
            </button>
            {open && (
              <>
                <div className="notif-scrim" onClick={() => setOpen(false)} />
                <div className="notif-panel">
                  <div className="notif-head">
                    <h3 className="serif">{t('admin.notif.title')}</h3>
                    {unreadCount > 0 && (
                      <button className="text-link" style={{ fontSize: '.76rem' }}
                        onClick={() => saveRead(adminNotifications.map((_, i) => i))}>
                        {t('admin.notif.markAll')}
                      </button>
                    )}
                  </div>
                  <div className="notif-list">
                    {adminNotifications.length === 0 && (
                      <div style={{ padding: 22, textAlign: 'center', color: 'var(--muted)', fontSize: '.85rem' }}>
                        {t('admin.notif.empty')}
                      </div>
                    )}
                    {adminNotifications.map((item, i) => {
                      const s = NOTIF_STYLE[item.type] || NOTIF_STYLE.booking;
                      const unread = isUnread(item, i);
                      return (
                        <div key={i} className={`notif-item${unread ? ' unread' : ''}`} onClick={() => openItem(item, i)}>
                          <div className="ni-ico" style={{ background: s.bg, color: s.color }}>
                            <Icon name={s.icon} size={16} stroke={2} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p>{L(item.text)}</p>
                            <time>{L(item.time)}</time>
                          </div>
                          {unread && <span className="ni-dot" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="profile" onClick={() => alert(t('common.demoNote'))}>
            <img src={`https://i.pravatar.cc/96?img=${profile.avatar}`} alt={`${profile.name} avatar`} />
            <div>
              <strong>{profile.name}</strong>
              <span>{t(profile.roleKey)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
