'use client';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { preBookings, fmtTaka } from '../../../lib/data';

export default function PreBookingPage() {
  const { t, n, L } = useLang();

  const advanceCollected = preBookings.reduce((a, b) => a + b.advance, 0);
  const awaiting = preBookings.filter((b) => b.status === 'awaitingAdvance').length;
  const futureValue = preBookings.reduce((a, b) => a + b.total, 0);

  const kpis = [
    { label: t('admin.prebooking.kpiTotal'), val: n(preBookings.length), icon: 'calendar', bg: 'rgba(45,108,181,.12)', color: 'var(--blue)' },
    { label: t('admin.prebooking.kpiAdvance'), val: fmtTaka(advanceCollected, n), icon: 'check', bg: 'rgba(30,142,90,.12)', color: 'var(--green)' },
    { label: t('admin.prebooking.kpiAwaiting'), val: n(awaiting), icon: 'clock', bg: 'rgba(185,123,15,.13)', color: 'var(--amber)' },
    { label: t('admin.prebooking.kpiValue'), val: fmtTaka(futureValue, n), icon: 'trendUp', bg: 'rgba(201,162,39,.14)', color: 'var(--gold)' },
  ];

  return (
    <>
      <AdminTopbar title={t('admin.prebooking.title')} sub={t('admin.prebooking.sub')} />

      <div className="kpis" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        {kpis.map((k, i) => (
          <div className="kpi" key={i}>
            <div className="kpi-top">
              <span>{k.label}</span>
              <div className="kpi-ico" style={{ background: k.bg, color: k.color }}><Icon name={k.icon} size={19} /></div>
            </div>
            <div className="kpi-val" style={{ fontSize: '1.3rem' }}>{k.val}</div>
          </div>
        ))}
      </div>

      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.prebooking.listTitle')}</h2>
            <div className="hint">{t('admin.prebooking.listHint')}</div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.table.ref')}</th>
                <th>{t('admin.table.guest')}</th>
                <th>{t('admin.table.villa')}</th>
                <th>{t('admin.table.dates')}</th>
                <th>{t('admin.bookings.nights')}</th>
                <th>{t('admin.table.total')}</th>
                <th>{t('admin.prebooking.advance')}</th>
                <th>{t('admin.prebooking.balance')}</th>
                <th>{t('admin.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {preBookings.map((b, i) => (
                <tr key={i}>
                  <td><b style={{ color: 'var(--forest)' }}>{b.ref}</b></td>
                  <td>
                    <div className="guest-cell">
                      <img src={`https://i.pravatar.cc/96?img=${b.avatar}`} alt="" />
                      <strong>{L(b.guest)}</strong>
                    </div>
                  </td>
                  <td>{L(b.villa)}</td>
                  <td>{L(b.dates)}</td>
                  <td>{n(b.nights)}</td>
                  <td><b>{fmtTaka(b.total, n)}</b></td>
                  <td style={{ color: b.advance > 0 ? 'var(--green)' : 'var(--muted)', fontWeight: 700 }}>
                    {b.advance > 0 ? fmtTaka(b.advance, n) : '—'}
                  </td>
                  <td>{fmtTaka(b.total - b.advance, n)}</td>
                  <td>
                    {b.status === 'awaitingAdvance' ? (
                      <button className="btn-admin no-print" style={{ padding: '7px 12px', fontSize: '.76rem' }}
                        onClick={() => alert(t('common.demoNote'))}>
                        {t('admin.prebooking.collectAdvance')}
                      </button>
                    ) : (
                      <StatusBadge status={b.status} />
                    )}
                  </td>
                </tr>
              ))}
              <tr style={{ background: 'var(--cream)' }}>
                <td colSpan={5}><b>{t('common.total')}</b></td>
                <td><b>{fmtTaka(futureValue, n)}</b></td>
                <td style={{ color: 'var(--green)' }}><b>{fmtTaka(advanceCollected, n)}</b></td>
                <td><b>{fmtTaka(futureValue - advanceCollected, n)}</b></td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
