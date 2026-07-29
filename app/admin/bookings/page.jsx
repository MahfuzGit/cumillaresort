'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { adminBookings, fmtTaka } from '../../../lib/data';

const FILTERS = ['all', 'confirmed', 'pending', 'checkedIn', 'cancelled'];

export default function BookingsPage() {
  const { t, n, L } = useLang();
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [dbBookings, setDbBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real bookings from Neon/API, fall back to mock data
  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/bookings');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setDbBookings(data.map((b) => ({
              ref: b.ref,
              guest: { en: b.guest_name, bn: b.guest_name },
              avatar: 33,
              villa: { en: b.villa_name, bn: b.villa_name },
              in: { en: new Date(b.check_in).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), bn: new Date(b.check_in).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) },
              out: { en: new Date(b.check_out).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), bn: new Date(b.check_out).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) },
              channel: { en: b.channel, bn: b.channel },
              total: b.total,
              status: b.status,
            })));
          }
        }
      } catch { /* API unconfigured — use mock */ }
      setLoading(false);
    }
    fetchBookings();
  }, []);

  // Merge: real DB bookings first, then mock (deduped by ref)
  const allBookings = dbBookings.length > 0
    ? [...dbBookings, ...adminBookings.filter((m) => !dbBookings.some((d) => d.ref === m.ref))]
    : adminBookings;

  const rows = allBookings.filter((b) => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (q && !(`${b.ref} ${b.guest.en} ${b.guest.bn}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <>
      <AdminTopbar title={t('admin.bookings.title')} sub={t('admin.bookings.sub')} />
      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.bookings.listTitle')}</h2>
            <div className="hint">{n(allBookings.length)} {t('admin.bookings.listHint')}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="search" style={{ minWidth: 200 }}>
              <Icon name="search" size={16} stroke={2} />
              <input placeholder={t('admin.bookings.searchPh')} value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="pill-tabs">
              {FILTERS.map((f) => (
                <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
                  {f === 'all' ? t('admin.bookings.all') : t(`admin.status.${f}`)}
                </button>
              ))}
            </div>
            <Link href="/admin/rent" className="btn-admin" style={{ textDecoration: 'none' }}>
              <Icon name="plus" size={15} stroke={2.4} /> {t('admin.dash.newBooking')}
            </Link>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--muted)', fontSize: '.9rem' }}>
              Loading…
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>{t('admin.table.ref')}</th><th>{t('admin.table.guest')}</th><th>{t('admin.table.villa')}</th>
                  <th>{t('admin.table.checkIn')}</th><th>{t('admin.table.checkOut')}</th>
                  <th>{t('admin.table.channel')}</th><th>{t('admin.table.total')}</th><th>{t('admin.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((b) => (
                  <tr key={b.ref} style={{ cursor: 'pointer' }}>
                    <td>
                      <Link href={`/admin/bookings/${b.ref}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <b style={{ color: 'var(--forest)' }}>{b.ref}</b>
                      </Link>
                    </td>
                    <td>
                      <div className="guest-cell">
                        <img src={`https://i.pravatar.cc/96?img=${b.avatar}`} alt="" />
                        <strong>{L(b.guest)}</strong>
                      </div>
                    </td>
                    <td>{L(b.villa)}</td>
                    <td>{L(b.in)}</td>
                    <td>{L(b.out)}</td>
                    <td>{L(b.channel)}</td>
                    <td><b>{fmtTaka(b.total, n)}</b></td>
                    <td><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
