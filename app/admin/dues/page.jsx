'use client';
import { useState } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { adminBookings, bookingBillingMap, fmtTaka } from '../../../lib/data';

export default function DuesPage() {
  const { t, n, L } = useLang();
  const [collected, setCollected] = useState([]); // refs marked collected

  // All bookings with an unpaid balance
  const dues = adminBookings
    .map((b) => ({ ...b, billing: bookingBillingMap[b.ref] }))
    .filter((b) => b.billing && b.billing.pending > 0)
    .sort((a, b) => b.billing.pending - a.billing.pending);

  const outstanding = dues.filter((d) => !collected.includes(d.ref)).reduce((a, d) => a + d.billing.pending, 0);
  const collectedAmt = dues.filter((d) => collected.includes(d.ref)).reduce((a, d) => a + d.billing.pending, 0);

  const kpis = [
    { label: t('admin.dues.totalOutstanding'), val: fmtTaka(outstanding, n), icon: 'alert', bg: 'rgba(192,69,44,.12)', color: 'var(--red)' },
    { label: t('admin.dues.duesCount'), val: n(dues.length - collected.length), icon: 'users', bg: 'rgba(185,123,15,.13)', color: 'var(--amber)' },
    { label: t('admin.dues.collectedMtd'), val: fmtTaka(842000 + collectedAmt, n), icon: 'check', bg: 'rgba(30,142,90,.12)', color: 'var(--green)' },
  ];

  return (
    <>
      <AdminTopbar title={t('admin.dues.title')} sub={t('admin.dues.sub')} />

      <div className="kpis" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {kpis.map((k, i) => (
          <div className="kpi" key={i}>
            <div className="kpi-top">
              <span>{k.label}</span>
              <div className="kpi-ico" style={{ background: k.bg, color: k.color }}><Icon name={k.icon} size={19} /></div>
            </div>
            <div className="kpi-val" style={{ fontSize: '1.4rem' }}>{k.val}</div>
          </div>
        ))}
      </div>

      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.dues.listTitle')}</h2>
            <div className="hint">{t('admin.dues.listHint')}</div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.table.ref')}</th>
                <th>{t('admin.table.guest')}</th>
                <th>{t('admin.table.villa')}</th>
                <th>{t('admin.dues.billTotal')}</th>
                <th>{t('admin.dues.alreadyPaid')}</th>
                <th>{t('admin.bookings.pendingAmount')}</th>
                <th>{t('admin.table.status')}</th>
                <th className="no-print" />
              </tr>
            </thead>
            <tbody>
              {dues.map((d) => {
                const isDone = collected.includes(d.ref);
                const billTotal = d.billing.subTotal + d.billing.tax - d.billing.discount;
                return (
                  <tr key={d.ref} style={isDone ? { opacity: 0.55 } : undefined}>
                    <td><b style={{ color: 'var(--forest)' }}>{d.ref}</b></td>
                    <td>
                      <div className="guest-cell">
                        <img src={`https://i.pravatar.cc/96?img=${d.avatar}`} alt="" />
                        <strong>{L(d.guest)}</strong>
                      </div>
                    </td>
                    <td>{L(d.villa)}</td>
                    <td>{fmtTaka(billTotal, n)}</td>
                    <td style={{ color: 'var(--muted)' }}>{fmtTaka(d.billing.paid, n)}</td>
                    <td>
                      <b style={{ color: isDone ? 'var(--green)' : 'var(--red)' }}>
                        {isDone ? fmtTaka(0, n) : fmtTaka(d.billing.pending, n)}
                      </b>
                    </td>
                    <td><StatusBadge status={isDone ? 'paid' : d.billing.paymentStatus} /></td>
                    <td className="no-print">
                      {!isDone && (
                        <button className="btn-admin" style={{ padding: '7px 12px', fontSize: '.76rem' }}
                          onClick={() => setCollected((p) => [...p, d.ref])}>
                          <Icon name="taka" size={14} stroke={2} /> {t('admin.dues.collectBtn')}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr style={{ background: 'var(--cream)' }}>
                <td colSpan={5}><b>{t('common.total')}</b></td>
                <td><b style={{ color: 'var(--red)' }}>{fmtTaka(outstanding, n)}</b></td>
                <td colSpan={2} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
