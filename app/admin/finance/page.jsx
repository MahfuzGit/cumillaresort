'use client';
import { useState, useEffect, useRef } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import {
  incomeCategories, expenseCategories, ledgerEntries, monthlyPL, fmtTaka,
  villaRates, getVillaMetrics, restaurantMetrics, getRestaurantMetrics,
} from '../../../lib/data';

const TABS = ['tabIncome', 'tabExpense', 'tabLedger', 'tabRates', 'tabRestaurants'];

export default function FinancePage() {
  const { t, n, L } = useLang();
  const [tab, setTab] = useState('tabIncome');
  const barsRef = useRef(null);
  const plRef = useRef(null);

  const totalIncome = incomeCategories.reduce((a, c) => a + c.amount, 0);
  const totalExpense = expenseCategories.reduce((a, c) => a + c.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const margin = ((netProfit / totalIncome) * 100).toFixed(1);
  const totalPrevIncome = incomeCategories.reduce((a, c) => a + c.prev, 0);
  const incomeChange = (((totalIncome - totalPrevIncome) / totalPrevIncome) * 100).toFixed(1);
  const totalBudget = expenseCategories.reduce((a, c) => a + c.budget, 0);

  const maxPL = Math.max(...monthlyPL.map((m) => m.rev));

  // Animate income/expense horizontal fill bars on tab change
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!barsRef.current) return;
    barsRef.current.querySelectorAll('.fill').forEach((f) => {
      f.style.width = '0%';
      if (reduce) { f.style.width = f.dataset.w; return; }
      requestAnimationFrame(() => requestAnimationFrame(() => { f.style.width = f.dataset.w; }));
    });
  }, [tab]);

  // Animate P&L bars on mount
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!plRef.current) return;
    plRef.current.querySelectorAll('.pl-bar').forEach((b) => {
      b.style.height = '0px';
      if (reduce) { b.style.height = b.dataset.h; return; }
      requestAnimationFrame(() => requestAnimationFrame(() => { b.style.height = b.dataset.h; }));
    });
  }, []);

  const kpis = [
    {
      label: t('admin.finance.totalIncome'), val: fmtTaka(totalIncome, n),
      icon: 'trendUp', bg: 'rgba(30,142,90,.12)', color: 'var(--green)',
      delta: `↑${n(incomeChange)}%`, up: true,
    },
    {
      label: t('admin.finance.totalExpense'), val: fmtTaka(totalExpense, n),
      icon: 'trendDown', bg: 'rgba(192,69,44,.12)', color: 'var(--red)',
      delta: `↓${n(2.1)}%`, up: false,
    },
    {
      label: t('admin.finance.netProfit'), val: fmtTaka(netProfit, n),
      icon: 'chart', bg: 'rgba(201,162,39,.14)', color: 'var(--gold)',
      delta: `↑${n(17.4)}%`, up: true,
    },
    {
      label: t('admin.finance.profitMargin'), val: `${n(margin)}%`,
      icon: 'taka', bg: 'rgba(45,108,181,.12)', color: 'var(--blue)',
      delta: t('admin.reports.stable'), up: null,
    },
  ];

  return (
    <>
      <AdminTopbar title={t('admin.finance.title')} sub={t('admin.finance.sub')} />

      {/* KPIs */}
      <div className="kpis" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        {kpis.map((k, i) => (
          <div className="kpi" key={i}>
            <div className="kpi-top">
              <span>{k.label}</span>
              <div className="kpi-ico" style={{ background: k.bg, color: k.color }}>
                <Icon name={k.icon} size={19} />
              </div>
            </div>
            <div className="kpi-val" style={{ fontSize: '1.35rem' }}>{k.val}</div>
            <span className={`kpi-delta${k.up === true ? ' up' : k.up === false ? ' dn' : ''}`}>
              {k.up === true && <Icon name="trendUp" size={13} stroke={2.4} />}
              {k.up === false && <Icon name="trendDown" size={13} stroke={2.4} />}
              {k.delta}
              {k.up !== null && <span style={{ marginLeft: 3 }}>{t('admin.finance.vsLastMonth')}</span>}
            </span>
          </div>
        ))}
      </div>

      {/* Main tabbed card */}
      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">
              {tab === 'tabIncome' && t('admin.finance.incomeTitle')}
              {tab === 'tabExpense' && t('admin.finance.expenseTitle')}
              {tab === 'tabLedger' && t('admin.finance.ledgerTitle')}
              {tab === 'tabRates' && t('admin.finance.ratesTitle')}
              {tab === 'tabRestaurants' && t('admin.finance.restTitle')}
            </h2>
            <div className="hint">
              {tab === 'tabIncome' && t('admin.finance.incomeHint')}
              {tab === 'tabExpense' && t('admin.finance.expenseHint')}
              {tab === 'tabLedger' && t('admin.finance.ledgerHint')}
              {tab === 'tabRates' && t('admin.finance.ratesHint')}
              {tab === 'tabRestaurants' && t('admin.finance.restHint')}
            </div>
          </div>
          <div className="pill-tabs">
            {TABS.map((tk) => (
              <button key={tk} className={tab === tk ? 'on' : ''} onClick={() => setTab(tk)}>
                {t(`admin.finance.${tk}`)}
              </button>
            ))}
          </div>
        </div>

        {/* -------- INCOME ANALYSIS -------- */}
        {tab === 'tabIncome' && (
          <div ref={barsRef}>
            {incomeCategories.map((c, i) => (
              <div className="occ-row" key={i}
                style={i === incomeCategories.length - 1 ? { marginBottom: 18 } : undefined}>
                <span style={{ minWidth: 190 }}>{L(c.label)}</span>
                <div className="track">
                  <div className="fill" data-w={`${c.pct}%`}
                    style={{ background: c.color, opacity: 0.8 }} />
                </div>
                <b style={{ minWidth: 100, textAlign: 'right' }}>{fmtTaka(c.amount, n)}</b>
                <span style={{ minWidth: 46, textAlign: 'right', fontSize: '.8rem', color: 'var(--muted)' }}>
                  {n(c.pct)}%
                </span>
              </div>
            ))}
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>{t('admin.finance.category')}</th>
                    <th>{t('admin.finance.amount')}</th>
                    <th>{t('admin.finance.ofTotal')}</th>
                    <th>{t('admin.finance.lastMonth')}</th>
                    <th>{t('admin.finance.change')}</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeCategories.map((c, i) => {
                    const chg = (((c.amount - c.prev) / c.prev) * 100).toFixed(1);
                    const up = c.amount >= c.prev;
                    return (
                      <tr key={i}>
                        <td>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <i style={{ width: 10, height: 10, borderRadius: 3, background: c.color, display: 'inline-block', flexShrink: 0 }} />
                            {L(c.label)}
                          </span>
                        </td>
                        <td><b>{fmtTaka(c.amount, n)}</b></td>
                        <td>{n(c.pct)}%</td>
                        <td style={{ color: 'var(--muted)' }}>{fmtTaka(c.prev, n)}</td>
                        <td>
                          <span className={`kpi-delta${up ? ' up' : ' dn'}`} style={{ fontSize: '.76rem' }}>
                            {up
                              ? <Icon name="trendUp" size={12} stroke={2.5} />
                              : <Icon name="trendDown" size={12} stroke={2.5} />}
                            {up ? '+' : ''}{n(chg)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: 'var(--cream)' }}>
                    <td><b>{t('common.total')}</b></td>
                    <td><b style={{ color: 'var(--forest)' }}>{fmtTaka(totalIncome, n)}</b></td>
                    <td><b>{n(100)}%</b></td>
                    <td style={{ color: 'var(--muted)' }}><b>{fmtTaka(totalPrevIncome, n)}</b></td>
                    <td>
                      <span className="kpi-delta up" style={{ fontSize: '.76rem' }}>
                        <Icon name="trendUp" size={12} stroke={2.5} />+{n(incomeChange)}%
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* -------- EXPENSE ANALYSIS -------- */}
        {tab === 'tabExpense' && (
          <div ref={barsRef}>
            {expenseCategories.map((c, i) => {
              const over = c.amount > c.budget;
              return (
                <div className="occ-row" key={i}
                  style={i === expenseCategories.length - 1 ? { marginBottom: 18 } : undefined}>
                  <span style={{ minWidth: 230 }}>{L(c.label)}</span>
                  <div className="track">
                    <div className="fill" data-w={`${c.pct}%`}
                      style={{ background: over ? 'var(--red)' : c.color, opacity: 0.8 }} />
                  </div>
                  <b style={{ minWidth: 100, textAlign: 'right', color: over ? 'var(--red)' : undefined }}>
                    {fmtTaka(c.amount, n)}
                  </b>
                  <span style={{ minWidth: 46, textAlign: 'right', fontSize: '.8rem', color: 'var(--muted)' }}>
                    {n(c.pct)}%
                  </span>
                </div>
              );
            })}
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>{t('admin.finance.category')}</th>
                    <th>{t('admin.finance.amount')}</th>
                    <th>{t('admin.finance.budget')}</th>
                    <th>{t('admin.finance.variance')}</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseCategories.map((c, i) => {
                    const variance = c.budget - c.amount;
                    const over = variance < 0;
                    return (
                      <tr key={i}>
                        <td>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <i style={{ width: 10, height: 10, borderRadius: 3, background: c.color, display: 'inline-block', flexShrink: 0 }} />
                            {L(c.label)}
                          </span>
                        </td>
                        <td style={{ color: over ? 'var(--red)' : undefined }}>
                          <b>{fmtTaka(c.amount, n)}</b>
                        </td>
                        <td style={{ color: 'var(--muted)' }}>{fmtTaka(c.budget, n)}</td>
                        <td>
                          <span className={`badge ${over ? 'b-red' : 'b-green'}`}>
                            {over ? '+' : '−'}{fmtTaka(Math.abs(variance), n)}{' '}
                            {over ? t('admin.finance.overBudget') : t('admin.finance.underBudget')}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ background: 'var(--cream)' }}>
                    <td><b>{t('common.total')}</b></td>
                    <td><b style={{ color: 'var(--red)' }}>{fmtTaka(totalExpense, n)}</b></td>
                    <td style={{ color: 'var(--muted)' }}><b>{fmtTaka(totalBudget, n)}</b></td>
                    <td>
                      <span className="badge b-green">
                        −{fmtTaka(totalBudget - totalExpense, n)}{' '}
                        {t('admin.finance.underBudget')}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* -------- LEDGER -------- */}
        {tab === 'tabLedger' && (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>{t('admin.finance.date')}</th>
                  <th>{t('admin.finance.ref')}</th>
                  <th>{t('admin.finance.description')}</th>
                  <th>{t('admin.finance.type')}</th>
                  <th style={{ textAlign: 'right' }}>{t('admin.finance.amount')}</th>
                </tr>
              </thead>
              <tbody>
                {ledgerEntries.map((e, i) => (
                  <tr key={i}>
                    <td style={{ whiteSpace: 'nowrap', color: 'var(--muted)', fontSize: '.88rem' }}>{L(e.date)}</td>
                    <td>
                      <code style={{ fontSize: '.78rem', color: 'var(--muted)', letterSpacing: '.03em' }}>
                        {e.ref}
                      </code>
                    </td>
                    <td>{L(e.desc)}</td>
                    <td>
                      <span className={`badge ${e.type === 'income' ? 'b-green' : 'b-red'}`}>
                        {e.type === 'income' ? t('admin.finance.income') : t('admin.finance.expense')}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <b style={{ color: e.type === 'income' ? 'var(--green)' : 'var(--red)' }}>
                        {e.type === 'income' ? '+' : '−'}{fmtTaka(e.amount, n)}
                      </b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------- VILLA RATES -------- */}
        {tab === 'tabRates' && (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>{t('admin.finance.villaType')}</th>
                  <th>{t('admin.finance.nightRate')}</th>
                  <th>{t('admin.finance.units')}</th>
                  <th>{t('admin.finance.occupancy')}</th>
                  <th>{t('admin.finance.potentialRev')}</th>
                  <th>{t('admin.finance.actualRev')}</th>
                </tr>
              </thead>
              <tbody>
                {getVillaMetrics(villaRates).map((v, i) => (
                  <tr key={i}>
                    <td><b>{L(v.type)}</b></td>
                    <td>{fmtTaka(v.nightRate, n)}</td>
                    <td>{n(v.units)}</td>
                    <td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 40, height: 6, background: 'var(--cream)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${v.occupancyPct}%`, height: '100%', background: v.occupancyPct >= 85 ? 'var(--green)' : v.occupancyPct >= 70 ? 'var(--amber)' : 'var(--red)', transition: 'width .4s' }} />
                        </div>
                        <span style={{ fontSize: '.8rem', color: 'var(--muted)', minWidth: 30 }}>{n(v.occupancyPct)}%</span>
                      </span>
                    </td>
                    <td style={{ color: 'var(--muted)' }}>{fmtTaka(Math.round(v.revenuePotential), n)}</td>
                    <td><b style={{ color: 'var(--forest)' }}>{fmtTaka(Math.round(v.revenueActual), n)}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* -------- RESTAURANT BREAKDOWN -------- */}
        {tab === 'tabRestaurants' && (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>{t('admin.finance.restaurant')}</th>
                  <th>{t('admin.finance.cuisine')}</th>
                  <th>{t('admin.finance.guests')}</th>
                  <th>{t('admin.finance.revenue')}</th>
                  <th>{t('admin.finance.foodCost')}</th>
                  <th>{t('admin.finance.margin')}</th>
                  <th>{t('admin.finance.marginPct')}</th>
                </tr>
              </thead>
              <tbody>
                {getRestaurantMetrics(restaurantMetrics).map((r, i) => (
                  <tr key={i}>
                    <td><b>{L(r.name)}</b></td>
                    <td style={{ fontSize: '.88rem', color: 'var(--muted)' }}>{L(r.cuisine)}</td>
                    <td>{n(r.guestCount)}</td>
                    <td><b style={{ color: 'var(--forest)' }}>{fmtTaka(r.mtdRevenue, n)}</b></td>
                    <td style={{ color: 'var(--red)' }}>
                      {fmtTaka(r.foodCost, n)}
                      <span style={{ fontSize: '.75rem', color: 'var(--muted)', marginLeft: 8 }}>({n(r.costPct)}%)</span>
                    </td>
                    <td><b>{fmtTaka(r.margin, n)}</b></td>
                    <td>
                      <span className="badge" style={{ background: `rgba(30,142,90,.12)`, color: 'var(--green)' }}>
                        {n(r.marginPct)}%
                      </span>
                    </td>
                  </tr>
                ))}
                <tr style={{ background: 'var(--cream)' }}>
                  <td colSpan={2}><b>{t('common.total')}</b></td>
                  <td><b>{n(restaurantMetrics.reduce((a, r) => a + r.guestCount, 0))}</b></td>
                  <td><b style={{ color: 'var(--forest)' }}>{fmtTaka(restaurantMetrics.reduce((a, r) => a + r.mtdRevenue, 0), n)}</b></td>
                  <td style={{ color: 'var(--red)' }}><b>{fmtTaka(restaurantMetrics.reduce((a, r) => a + r.foodCost, 0), n)}</b></td>
                  <td><b>{fmtTaka(restaurantMetrics.reduce((a, r) => a + r.margin, 0), n)}</b></td>
                  <td>
                    <span className="badge" style={{ background: `rgba(30,142,90,.12)`, color: 'var(--green)' }}>
                      {n(((restaurantMetrics.reduce((a, r) => a + r.margin, 0) / restaurantMetrics.reduce((a, r) => a + r.mtdRevenue, 0)) * 100).toFixed(1))}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* -------- MONTHLY P&L CHART -------- */}
      <div className="acard" ref={plRef}>
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.finance.plTitle')}</h2>
            <div className="hint">{t('admin.finance.plHint')}</div>
          </div>
          <div className="pl-legend">
            <span>
              <i style={{ background: 'var(--forest)' }} />
              {t('admin.finance.revenue')}
            </span>
            <span>
              <i style={{ background: 'var(--red)' }} />
              {t('admin.finance.totalExpense')}
            </span>
          </div>
        </div>
        <div className="pl-chart">
          {monthlyPL.map((m, i) => {
            const revH = `${(m.rev / maxPL) * 100}%`;
            const expH = `${(m.exp / maxPL) * 100}%`;
            const isMtd = i === monthlyPL.length - 1;
            return (
              <div className="pl-group" key={i}>
                <div className="pl-vals">
                  <span style={{ color: 'var(--forest)', fontSize: '.69rem', fontWeight: 700 }}>
                    ৳{n(m.rev)}L
                  </span>
                  <span style={{ color: 'var(--red)', fontSize: '.66rem' }}>৳{n(m.exp)}L</span>
                </div>
                <div className="pl-bars">
                  <div className="pl-bar rev" data-h={revH} style={{ height: 0 }} />
                  <div className="pl-bar exp" data-h={expH} style={{ height: 0 }} />
                </div>
                <span className="pl-lbl" style={isMtd ? { color: 'var(--gold)', fontWeight: 700 } : undefined}>
                  {L(m.m)}{isMtd ? ' *' : ''}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: '.76rem', color: 'var(--muted)', marginTop: 10 }}>
          * {t('admin.finance.plMtdNote')}
        </div>
      </div>
    </>
  );
}
