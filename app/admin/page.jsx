'use client';
import { useEffect, useRef } from 'react';
import AdminTopbar from '../../components/AdminTopbar';
import StatusBadge from '../../components/StatusBadge';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { adminBookings, adminCheckins, fmtTaka } from '../../lib/data';

function useBarAnimation() {
  const ref = useRef(null);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ref.current?.querySelectorAll('.fill').forEach((f) => {
      if (reduce) { f.style.width = f.dataset.w; return; }
      requestAnimationFrame(() => requestAnimationFrame(() => { f.style.width = f.dataset.w; }));
    });
  }, []);
  return ref;
}

function LineChart() {
  const lineRef = useRef(null);
  const areaRef = useRef(null);
  const dotsRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const line = lineRef.current;
    if (!line || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const len = line.getTotalLength();
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    line.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.22,.61,.36,1)';
    areaRef.current.style.opacity = '0';
    areaRef.current.style.transition = 'opacity 1.2s .8s';
    dotsRef.current.style.opacity = '0';
    dotsRef.current.style.transition = 'opacity .6s 1.4s';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      line.style.strokeDashoffset = '0';
      areaRef.current.style.opacity = '1';
      dotsRef.current.style.opacity = '1';
    }));
  }, []);

  return (
    <svg className="chart-svg" viewBox="0 0 640 230" role="img" aria-label={t('admin.dash.trendHint')}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A227" stopOpacity=".30" />
          <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="#E5E1D6" strokeWidth="1">
        <line x1="40" y1="30" x2="620" y2="30" /><line x1="40" y1="80" x2="620" y2="80" />
        <line x1="40" y1="130" x2="620" y2="130" /><line x1="40" y1="180" x2="620" y2="180" />
      </g>
      <text className="chart-label" x="12" y="34">32</text>
      <text className="chart-label" x="12" y="84">27</text>
      <text className="chart-label" x="12" y="134">22</text>
      <text className="chart-label" x="12" y="184">17</text>
      <path ref={areaRef} fill="url(#areaGrad)" d="M40,136 L92,124 L144,130 L196,105 L248,112 L300,88 L352,95 L404,70 L456,78 L508,56 L560,62 L620,42 L620,180 L40,180 Z" />
      <path ref={lineRef} className="chart-line" d="M40,136 L92,124 L144,130 L196,105 L248,112 L300,88 L352,95 L404,70 L456,78 L508,56 L560,62 L620,42" />
      <g ref={dotsRef}>
        {[[40,136],[144,130],[248,112],[352,95],[456,78],[560,62],[620,42]].map(([cx, cy], i) => (
          <circle key={i} className="chart-dot" cx={cx} cy={cy} r={i === 6 ? 5 : 4} />
        ))}
      </g>
      <text className="chart-label" x="36" y="205">May 30</text>
      <text className="chart-label" x="180" y="205">Jun 2</text>
      <text className="chart-label" x="330" y="205">Jun 5</text>
      <text className="chart-label" x="480" y="205">Jun 8</text>
      <text className="chart-label" x="590" y="205">Jun 10</text>
    </svg>
  );
}

function Donut() {
  const ref = useRef(null);
  const { t, n } = useLang();
  useEffect(() => {
    const segs = ref.current?.querySelectorAll('.seg') ?? [];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    segs.forEach((seg, i) => {
      seg.style.strokeDashoffset = seg.dataset.offset || '0';
      if (reduce) { seg.setAttribute('stroke-dasharray', seg.dataset.dash); return; }
      seg.style.transition = `stroke-dasharray 1.4s ${0.2 + i * 0.15}s cubic-bezier(.22,.61,.36,1)`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        seg.setAttribute('stroke-dasharray', seg.dataset.dash);
      }));
    });
  }, []);
  const legend = [
    { key: 'accommodation', color: '#16302B', pct: 65 },
    { key: 'diningRev', color: '#C9A227', pct: 25 },
    { key: 'expRev', color: '#2D6CB5', pct: 10 },
  ];
  return (
    <div className="donut-wrap">
      <div className="donut" ref={ref}>
        <svg width="165" height="165" viewBox="0 0 170 170" role="img" aria-label={t('admin.dash.revenueMix')}>
          <circle cx="85" cy="85" r="70" stroke="#EFEAE0" />
          <circle className="seg" cx="85" cy="85" r="70" stroke="#16302B" strokeDasharray="0 440" data-dash="286 440" />
          <circle className="seg" cx="85" cy="85" r="70" stroke="#C9A227" strokeDasharray="0 440" data-dash="110 440" data-offset="-286" />
          <circle className="seg" cx="85" cy="85" r="70" stroke="#2D6CB5" strokeDasharray="0 440" data-dash="44 440" data-offset="-396" />
        </svg>
        <div className="donut-center">
          <strong>৳{n('48.2')}L</strong>
          <span>{t('admin.dash.totalMtd')}</span>
        </div>
      </div>
      <div className="donut-legend">
        {legend.map((l) => (
          <div className="row" key={l.key}>
            <span><i style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 3, background: l.color, marginRight: 8 }} />{t(`admin.dash.${l.key}`)}</span>
            <b>{n(l.pct)}%</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { t, n, L } = useLang();
  const barsRef = useBarAnimation();

  const kpis = [
    { label: t('admin.dash.occupancy'), val: `${n(87)}%`, icon: 'home', bg: 'rgba(30,142,90,.12)', color: 'var(--green)', delta: <span className="kpi-delta up"><Icon name="trendUp" size={14} stroke={2.4} />+{n('6.2')}% {t('admin.dash.vsLastWeek')}</span> },
    { label: t('admin.dash.revenueMtd'), val: `৳${n('48,23,500')}`, icon: 'taka', bg: 'rgba(201,162,39,.14)', color: 'var(--gold)', delta: <span className="kpi-delta up"><Icon name="trendUp" size={14} stroke={2.4} />+{n('11.4')}% {t('admin.dash.vsLastMonth')}</span> },
    { label: t('admin.dash.arrivals'), val: n(11), icon: 'users', bg: 'rgba(45,108,181,.12)', color: 'var(--blue)', delta: <span className="kpi-delta" style={{ color: 'var(--muted)' }}>{n(6)} {t('admin.dash.checkedIn')} · {n(5)} {t('admin.dash.expected')}</span> },
    { label: t('admin.dash.requests'), val: n(7), icon: 'alert', bg: 'rgba(192,69,44,.12)', color: 'var(--red)', delta: <span className="kpi-delta down"><Icon name="trendDown" size={14} stroke={2.4} />{n(2)} {t('admin.dash.urgent')}</span> },
  ];

  return (
    <>
      <AdminTopbar title={`${t('admin.top.greeting')}, Maya`} sub={t('admin.dash.sub')} />

      <div className="kpis">
        {kpis.map((k, i) => (
          <div className="kpi" key={i}>
            <div className="kpi-top">
              <span>{k.label}</span>
              <div className="kpi-ico" style={{ background: k.bg, color: k.color }}><Icon name={k.icon} size={19} /></div>
            </div>
            <div className="kpi-val">{k.val}</div>
            {k.delta}
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="acard">
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.dash.occupancyTrend')}</h2>
              <div className="hint">{t('admin.dash.trendHint')}</div>
            </div>
            <div className="pill-tabs">
              <button className="on">{t('admin.dash.nights12')}</button>
              <button onClick={() => alert(t('common.demoNote'))}>{t('admin.dash.nights30')}</button>
              <button onClick={() => alert(t('common.demoNote'))}>{t('admin.dash.quarter')}</button>
            </div>
          </div>
          <LineChart />
          <div className="legend">
            <span><i style={{ background: 'var(--gold)' }} />{t('admin.dash.occupied')}</span>
            <span><i style={{ background: 'var(--line)' }} />{t('admin.dash.capacity')}</span>
          </div>
        </div>

        <div className="acard" ref={barsRef}>
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.dash.revenueMix')}</h2>
              <div className="hint">{t('admin.dash.mtd')}</div>
            </div>
          </div>
          <Donut />
          <div style={{ borderTop: '1px solid var(--cream)', marginTop: 18, paddingTop: 16 }}>
            <div className="occ-row"><span>{t('admin.dash.teaVillas')}</span><div className="track"><div className="fill" data-w="92%" /></div><b>{n(92)}%</b></div>
            <div className="occ-row"><span>{t('admin.dash.treehouses')}</span><div className="track"><div className="fill" data-w="84%" /></div><b>{n(84)}%</b></div>
            <div className="occ-row" style={{ marginBottom: 0 }}><span>{t('admin.dash.cottages')}</span><div className="track"><div className="fill" data-w="71%" /></div><b>{n(71)}%</b></div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="acard">
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.dash.recentBookings')}</h2>
              <div className="hint">{t('admin.dash.recentHint')}</div>
            </div>
            <button className="btn-admin" onClick={() => alert(t('common.demoNote'))}>
              <Icon name="plus" size={15} stroke={2.4} /> {t('admin.dash.newBooking')}
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>{t('admin.table.guest')}</th><th>{t('admin.table.villa')}</th>
                  <th>{t('admin.table.dates')}</th><th>{t('admin.table.total')}</th><th>{t('admin.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {adminBookings.slice(0, 5).map((b) => (
                  <tr key={b.ref} onClick={() => alert(t('common.demoNote'))}>
                    <td>
                      <div className="guest-cell">
                        <img src={`https://i.pravatar.cc/96?img=${b.avatar}`} alt="" />
                        <div>
                          <strong>{L(b.guest)}</strong>
                          <span>{b.ref} · {L(b.channel)}</span>
                        </div>
                      </div>
                    </td>
                    <td>{L(b.villa)}</td>
                    <td>{L(b.in)} – {L(b.out)}</td>
                    <td><b>{fmtTaka(b.total, n)}</b></td>
                    <td><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="acard">
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.dash.todayCheckins')}</h2>
              <div className="hint">{n(5)} {t('admin.dash.arrivalsLeft')}</div>
            </div>
          </div>
          {adminCheckins.map((c, i) => (
            <div className="checkin" key={i}>
              <img src={`https://i.pravatar.cc/96?img=${c.avatar}`} alt="" />
              <div className="who">
                <strong>{L(c.name)}</strong>
                <span>{L(c.info)}</span>
              </div>
              <time>{n(c.time)}</time>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
