'use client';
import Link from 'next/link';
import AdminTopbar from '../../../../components/AdminTopbar';
import StatusBadge from '../../../../components/StatusBadge';
import Icon from '../../../../components/Icons';
import { useLang } from '../../../../lib/i18n';
import { adminGuests, fmtTaka } from '../../../../lib/data';

export default function GuestRecordPage({ params }) {
  const { t, n, L } = useLang();
  const guest = adminGuests[Number(params.id)];

  if (!guest) {
    return (
      <>
        <AdminTopbar title={t('admin.guests.profileTitle')} sub="—" />
        <div className="acard" style={{ textAlign: 'center', color: 'var(--muted)' }}>
          {t('common.demoNote')}
        </div>
      </>
    );
  }

  const lifetime = guest.history.reduce((a, h) => a + h.amount, 0);

  return (
    <>
      <AdminTopbar title={t('admin.guests.profileTitle')} sub={L(guest.name)} />

      <Link href="/admin/guests" className="text-link no-print" style={{ display: 'inline-block', marginBottom: 14, fontSize: '.85rem' }}>
        {t('admin.guests.backToList')}
      </Link>

      {/* -------- PROFILE + CONTACT -------- */}
      <div className="grid-2" style={{ marginBottom: 18 }}>
        <div className="acard" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 18 }}>
            <img
              src={`https://i.pravatar.cc/160?img=${guest.avatar}`}
              alt=""
              style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--cream)' }}
            />
            <div>
              <h2 className="serif" style={{ marginBottom: 4 }}>{L(guest.name)}</h2>
              <div style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: 6 }}>{L(guest.from)}</div>
              <StatusBadge status={guest.tier} />
            </div>
          </div>
          <div className="kpis" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 0 }}>
            <div className="kpi" style={{ padding: 14 }}>
              <div className="kpi-top"><span style={{ fontSize: '.72rem' }}>{t('admin.guests.memberSince')}</span></div>
              <div className="kpi-val" style={{ fontSize: '1.2rem' }}>{n(guest.since)}</div>
            </div>
            <div className="kpi" style={{ padding: 14 }}>
              <div className="kpi-top"><span style={{ fontSize: '.72rem' }}>{t('admin.guests.totalVisits')}</span></div>
              <div className="kpi-val" style={{ fontSize: '1.2rem' }}>{n(guest.visits)}</div>
            </div>
            <div className="kpi" style={{ padding: 14 }}>
              <div className="kpi-top"><span style={{ fontSize: '.72rem' }}>{t('admin.guests.totalSpend')}</span></div>
              <div className="kpi-val" style={{ fontSize: '1.2rem' }}>{fmtTaka(lifetime, n)}</div>
            </div>
          </div>
        </div>

        <div className="acard" style={{ marginBottom: 0 }}>
          <h2 className="serif" style={{ marginBottom: 14 }}>{t('admin.guests.contact')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="phone" size={16} stroke={2} />
              <div>
                <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{t('admin.guests.phone')}</div>
                <b style={{ fontSize: '.92rem' }}>{guest.phone}</b>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="mail" size={16} stroke={2} />
              <div>
                <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{t('admin.guests.email')}</div>
                <b style={{ fontSize: '.92rem' }}>{guest.email}</b>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="shield" size={16} stroke={2} />
              <div>
                <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{t('admin.guests.idDoc')}</div>
                <b style={{ fontSize: '.92rem' }}>{L(guest.nid)}</b>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="home" size={16} stroke={2} />
              <div>
                <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{t('admin.guests.currentStay')}</div>
                <b style={{ fontSize: '.92rem' }}>{L(guest.villa)} · {L(guest.stay)}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------- STAFF NOTES -------- */}
      <div className="acard" style={{ marginBottom: 18, borderLeft: '4px solid var(--gold)' }}>
        <h2 className="serif" style={{ marginBottom: 8 }}>{t('admin.guests.notesTitle')}</h2>
        <p style={{ fontSize: '.92rem', color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>{L(guest.notes)}</p>
        <div style={{ marginTop: 10, fontSize: '.82rem', color: 'var(--muted)' }}>
          {t('admin.table.preferences')}: {L(guest.prefs)}
        </div>
      </div>

      {/* -------- STAY HISTORY -------- */}
      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.guests.historyTitle')}</h2>
            <div className="hint">{t('admin.guests.historyHint')}</div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.table.ref')}</th>
                <th>{t('admin.table.villa')}</th>
                <th>{t('admin.table.dates')}</th>
                <th>{t('admin.bookings.nights')}</th>
                <th>{t('admin.table.total')}</th>
                <th>{t('admin.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {guest.history.map((h, i) => (
                <tr key={i}>
                  <td><b style={{ color: 'var(--forest)' }}>{h.ref}</b></td>
                  <td>{L(h.villa)}</td>
                  <td>{L(h.dates)}</td>
                  <td>{n(h.nights)}</td>
                  <td><b>{fmtTaka(h.amount, n)}</b></td>
                  <td><StatusBadge status={h.status} /></td>
                </tr>
              ))}
              <tr style={{ background: 'var(--cream)' }}>
                <td colSpan={4}><b>{t('common.total')}</b></td>
                <td><b style={{ color: 'var(--forest)' }}>{fmtTaka(lifetime, n)}</b></td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
