'use client';
import { useState } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { adminCheckins, todayDepartures, fmtTaka } from '../../../lib/data';

export default function FrontDeskPage() {
  const { t, n, L } = useLang();
  const [arrived, setArrived] = useState([]);   // indexes checked in
  const [departed, setDeparted] = useState([]); // indexes checked out

  const kpis = [
    { label: t('admin.frontdesk.arrivalsToday'), val: n(adminCheckins.length), icon: 'arrowRight', bg: 'rgba(30,142,90,.12)', color: 'var(--green)' },
    { label: t('admin.frontdesk.departuresToday'), val: n(todayDepartures.length), icon: 'logout', bg: 'rgba(185,123,15,.13)', color: 'var(--amber)' },
    { label: t('admin.frontdesk.inHouse'), val: n(23 + arrived.length - departed.length), icon: 'users', bg: 'rgba(45,108,181,.12)', color: 'var(--blue)' },
    { label: t('admin.frontdesk.occNow'), val: `${n(Math.round(((23 + arrived.length - departed.length) / 32) * 100))}%`, icon: 'home', bg: 'rgba(201,162,39,.14)', color: 'var(--gold)' },
  ];

  return (
    <>
      <AdminTopbar title={t('admin.frontdesk.title')} sub={t('admin.frontdesk.sub')} />

      <div className="kpis" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        {kpis.map((k, i) => (
          <div className="kpi" key={i}>
            <div className="kpi-top">
              <span>{k.label}</span>
              <div className="kpi-ico" style={{ background: k.bg, color: k.color }}><Icon name={k.icon} size={19} /></div>
            </div>
            <div className="kpi-val" style={{ fontSize: '1.5rem' }}>{k.val}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* -------- ARRIVALS -------- */}
        <div className="acard" style={{ marginBottom: 0 }}>
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.frontdesk.arrivalsTitle')}</h2>
              <div className="hint">{t('admin.frontdesk.arrivalsHint')}</div>
            </div>
          </div>
          {adminCheckins.map((c, i) => {
            const done = arrived.includes(i);
            return (
              <div className="checkin" key={i}>
                <img src={`https://i.pravatar.cc/96?img=${c.avatar}`} alt="" style={{ width: 39, height: 39, borderRadius: '50%', objectFit: 'cover' }} />
                <div className="who">
                  <strong>{L(c.name)}</strong>
                  <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--muted)' }}>
                    {L(c.info)} · {t('admin.frontdesk.eta')} {n(c.time)}
                  </span>
                </div>
                {done ? (
                  <span className="badge b-green">{t('admin.frontdesk.checkedInDone')}</span>
                ) : (
                  <button className="btn-admin no-print" style={{ padding: '8px 14px', fontSize: '.8rem' }}
                    onClick={() => setArrived((p) => [...p, i])}>
                    <Icon name="check" size={14} stroke={2.4} /> {t('admin.frontdesk.checkInBtn')}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* -------- DEPARTURES -------- */}
        <div className="acard" style={{ marginBottom: 0 }}>
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.frontdesk.departuresTitle')}</h2>
              <div className="hint">{t('admin.frontdesk.departuresHint')}</div>
            </div>
          </div>
          {todayDepartures.map((d, i) => {
            const done = departed.includes(i);
            return (
              <div className="checkin" key={i}>
                <img src={`https://i.pravatar.cc/96?img=${d.avatar}`} alt="" style={{ width: 39, height: 39, borderRadius: '50%', objectFit: 'cover' }} />
                <div className="who">
                  <strong>{L(d.name)}</strong>
                  <span style={{ display: 'block', fontSize: '.78rem', color: 'var(--muted)' }}>
                    {L(d.villa)} · {d.ref} · {t('admin.frontdesk.etd')} {n(d.time)}
                  </span>
                  <span style={{ display: 'block', fontSize: '.78rem', fontWeight: 700, color: d.due > 0 ? 'var(--red)' : 'var(--green)' }}>
                    {d.due > 0
                      ? `${t('admin.frontdesk.dueAtCheckout')}: ${fmtTaka(d.due, n)}`
                      : t('admin.frontdesk.noDue')}
                  </span>
                </div>
                {done ? (
                  <span className="badge b-grey">{t('admin.frontdesk.checkedOutDone')}</span>
                ) : (
                  <button className="btn-admin no-print" style={{ padding: '8px 14px', fontSize: '.8rem' }}
                    onClick={() => setDeparted((p) => [...p, i])}>
                    <Icon name="logout" size={14} stroke={2.2} /> {t('admin.frontdesk.checkOutBtn')}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
