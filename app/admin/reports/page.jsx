'use client';
import { useEffect, useRef } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { monthlyRevenue, channels, topExperiences, adminStaff, fmtTaka } from '../../../lib/data';

const CHANNEL_LABELS = {
  directWeb: null, bookingCom: 'Booking.com', expedia: 'Expedia', agents: null, phone: null,
};

export default function ReportsPage() {
  const { t, n, L } = useLang();
  const barsRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    barsRef.current?.querySelectorAll('.fill').forEach((f) => {
      if (reduce) { f.style.width = f.dataset.w; return; }
      requestAnimationFrame(() => requestAnimationFrame(() => { f.style.width = f.dataset.w; }));
    });
  }, []);

  const max = Math.max(...monthlyRevenue.map((m) => m.v));

  return (
    <>
      <AdminTopbar title={t('admin.reports.title')} sub={t('admin.reports.sub')} />

      {/* ---------- MONTHLY SUMMARY (one-page printable overview) ---------- */}
      <div className="acard" style={{ marginBottom: 18, borderLeft: '4px solid var(--gold)' }}>
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.reports.summaryTitle')}</h2>
            <div className="hint">{t('admin.reports.summaryHint')}</div>
          </div>
        </div>
        <div className="kpis" style={{ gridTemplateColumns: 'repeat(6,1fr)', marginBottom: 0 }}>
          {[
            { label: t('admin.reports.occAvg'), val: `${n(87)}%` },
            { label: t('admin.reports.revTotal'), val: `৳${n('48,23,500')}` },
            { label: t('admin.reports.payrollTotal'), val: fmtTaka(adminStaff.reduce((a, s) => a + s.salary + s.att.ot * s.otRate - s.deduction, 0), n) },
            { label: t('admin.reports.otTotal'), val: `${n(adminStaff.reduce((a, s) => a + s.att.ot, 0))} ${t('admin.hr.hoursUnit')}` },
            { label: t('admin.reports.tasksDone'), val: n(124) },
            { label: t('admin.reports.bookingsTotal'), val: n(128) },
          ].map((s, i) => (
            <div className="kpi" key={i} style={{ padding: 16 }}>
              <div className="kpi-top"><span style={{ fontSize: '.72rem' }}>{s.label}</span></div>
              <div className="kpi-val" style={{ fontSize: '1.25rem' }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="kpi-top"><span>{t('admin.reports.revpar')}</span></div>
          <div className="kpi-val">৳{n('13,900')}</div>
          <span className="kpi-delta up"><Icon name="trendUp" size={14} stroke={2.4} />+{n('8.1')}% {t('admin.reports.yoy')}</span>
        </div>
        <div className="kpi">
          <div className="kpi-top"><span>{t('admin.reports.adr')}</span></div>
          <div className="kpi-val">৳{n('16,000')}</div>
          <span className="kpi-delta up"><Icon name="trendUp" size={14} stroke={2.4} />+{n('4.6')}% {t('admin.reports.yoy')}</span>
        </div>
        <div className="kpi">
          <div className="kpi-top"><span>{t('admin.reports.avgStay')}</span></div>
          <div className="kpi-val">{n('3.8')} {t('admin.reports.nightsUnit')}</div>
          <span className="kpi-delta" style={{ color: 'var(--muted)' }}>{t('admin.reports.stable')}</span>
        </div>
        <div className="kpi">
          <div className="kpi-top"><span>{t('admin.reports.rating')}</span></div>
          <div className="kpi-val">{n('4.9')} / {n(5)}</div>
          <span className="kpi-delta up"><Icon name="trendUp" size={14} stroke={2.4} />{n('1,204')} {t('admin.reports.reviews')}</span>
        </div>
      </div>

      <div className="grid-2">
        <div className="acard">
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.reports.monthlyTitle')}</h2>
              <div className="hint">{t('admin.reports.monthlyHint')}</div>
            </div>
            <button className="btn-admin" onClick={() => alert(t('common.demoNote'))}>
              <Icon name="download" size={15} stroke={2} /> {t('admin.reports.export')}
            </button>
          </div>
          <div className="bar-chart">
            {monthlyRevenue.map((m, i) => (
              <div className="bar" key={i}>
                <span className="val">৳{n(m.v)}L</span>
                <div className={`col${i === monthlyRevenue.length - 1 ? ' hi' : ''}`} style={{ height: `${(m.v / max) * 78}%`, animationDelay: `${i * 0.1}s` }} />
                <span className="lbl">{L(m.m)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="acard">
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.reports.topExp')}</h2>
              <div className="hint">{t('admin.reports.topExpHint')}</div>
            </div>
          </div>
          {topExperiences.map((e, i) => (
            <div className="checkin" key={i}>
              <div style={{ width: 39, height: 39, borderRadius: 12, background: 'rgba(201,162,39,.12)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: 'var(--font-head)' }}>
                {n(i + 1)}
              </div>
              <div className="who"><strong>{L(e.name)}</strong></div>
              <time>{n(e.count)}</time>
            </div>
          ))}
        </div>
      </div>

      <div className="acard" ref={barsRef}>
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.reports.channelTitle')}</h2>
            <div className="hint">{t('admin.reports.channelHint')}</div>
          </div>
        </div>
        {channels.map((c, i) => (
          <div className="occ-row" key={i} style={i === channels.length - 1 ? { marginBottom: 0 } : undefined}>
            <span>{CHANNEL_LABELS[c.name] ?? t(`admin.reports.${c.name}`)}</span>
            <div className="track"><div className="fill" data-w={`${c.pct}%`} /></div>
            <b>{n(c.pct)}%</b>
          </div>
        ))}
      </div>
    </>
  );
}
