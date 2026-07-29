'use client';
import { useState } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { adminStaff, fmtTaka } from '../../../lib/data';

const TABS = ['tabRoster', 'tabAttendance', 'tabPayroll'];

export default function HRPage() {
  const { t, n, L } = useLang();
  const [tab, setTab] = useState('tabRoster');

  // Derived HR numbers
  const totalStaff = adminStaff.length;
  const onDuty = adminStaff.filter((s) => s.status === 'onDuty').length;
  const onLeave = adminStaff.filter((s) => s.status === 'onLeave').length;
  const totalOt = adminStaff.reduce((sum, s) => sum + s.att.ot, 0);
  const payrollTotal = adminStaff.reduce((sum, s) => sum + s.salary + s.att.ot * s.otRate - s.deduction, 0);

  const kpis = [
    { label: t('admin.hr.totalStaff'), val: n(totalStaff), icon: 'users', bg: 'rgba(30,142,90,.12)', color: 'var(--green)' },
    { label: t('admin.hr.onDutyToday'), val: n(onDuty), icon: 'check', bg: 'rgba(45,108,181,.12)', color: 'var(--blue)' },
    { label: t('admin.hr.onLeaveNow'), val: n(onLeave), icon: 'calendar', bg: 'rgba(185,123,15,.13)', color: 'var(--amber)' },
    { label: t('admin.hr.otThisMonth'), val: `${n(totalOt)} ${t('admin.hr.hoursUnit')}`, icon: 'clock', bg: 'rgba(192,69,44,.12)', color: 'var(--red)' },
    { label: t('admin.hr.payrollCost'), val: fmtTaka(payrollTotal, n), icon: 'wallet', bg: 'rgba(201,162,39,.14)', color: 'var(--gold)' },
  ];

  return (
    <>
      <AdminTopbar title={t('admin.hr.title')} sub={t('admin.hr.sub')} />

      <div className="kpis" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
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

      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">
              {tab === 'tabRoster' && t('admin.hr.rosterTitle')}
              {tab === 'tabAttendance' && t('admin.hr.attTitle')}
              {tab === 'tabPayroll' && t('admin.hr.payTitle')}
            </h2>
            <div className="hint">
              {tab === 'tabRoster' && t('admin.hr.rosterHint')}
              {tab === 'tabAttendance' && t('admin.hr.attHint')}
              {tab === 'tabPayroll' && t('admin.hr.payHint')}
            </div>
          </div>
          <div className="pill-tabs">
            {TABS.map((tk) => (
              <button key={tk} className={tab === tk ? 'on' : ''} onClick={() => setTab(tk)}>
                {t(`admin.hr.${tk}`)}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- ROSTER PLAN ---------- */}
        {tab === 'tabRoster' && (
          <div style={{ overflowX: 'auto' }}>
            <table className="roster-table">
              <thead>
                <tr>
                  <th>{t('admin.sidebar.staff')}</th>
                  {t('admin.hr.days').map((d, i) => <th key={i}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {adminStaff.map((s, i) => (
                  <tr key={i}>
                    <td>
                      <div className="guest-cell">
                        <img src={`https://i.pravatar.cc/96?img=${s.avatar}`} alt="" />
                        <div>
                          <strong>{L(s.name)}</strong>
                          <span>{L(s.role)}</span>
                        </div>
                      </div>
                    </td>
                    {s.week.map((code, j) => (
                      <td key={j}>
                        <span className={`shift-chip sh-${code}`}>{t(`admin.hr.shift${code}`)}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="legend" style={{ marginTop: 14 }}>
              <span><i style={{ background: 'var(--green)' }} />{t('admin.staff.morning')}</span>
              <span><i style={{ background: 'var(--amber)' }} />{t('admin.staff.evening')}</span>
              <span><i style={{ background: 'var(--blue)' }} />{t('admin.staff.nightShift')}</span>
              <span><i style={{ background: 'var(--muted)' }} />{t('admin.hr.shiftO')}</span>
            </div>
          </div>
        )}

        {/* ---------- ATTENDANCE & HOURS ---------- */}
        {tab === 'tabAttendance' && (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>{t('admin.sidebar.staff')}</th>
                  <th>{t('admin.table.department')}</th>
                  <th>{t('admin.hr.daysWorked')}</th>
                  <th>{t('admin.hr.hoursWorked')}</th>
                  <th>{t('admin.hr.otHours')}</th>
                  <th>{t('admin.hr.lateDays')}</th>
                  <th>{t('admin.hr.leaveDays')}</th>
                  <th>{t('admin.table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {adminStaff.map((s, i) => (
                  <tr key={i}>
                    <td>
                      <div className="guest-cell">
                        <img src={`https://i.pravatar.cc/96?img=${s.avatar}`} alt="" />
                        <div>
                          <strong>{L(s.name)}</strong>
                          <span>{L(s.role)}</span>
                        </div>
                      </div>
                    </td>
                    <td>{L(s.dept)}</td>
                    <td>{n(s.att.days)}</td>
                    <td><b>{n(s.att.hours)} {t('admin.hr.hoursUnit')}</b></td>
                    <td style={{ color: s.att.ot > 8 ? 'var(--red)' : 'var(--amber)', fontWeight: 700 }}>
                      {n(s.att.ot)} {t('admin.hr.hoursUnit')}
                    </td>
                    <td>{n(s.att.late)}</td>
                    <td>{n(s.att.leave)}</td>
                    <td><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ---------- PAYROLL ---------- */}
        {tab === 'tabPayroll' && (
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>{t('admin.sidebar.staff')}</th>
                  <th>{t('admin.hr.baseSalary')}</th>
                  <th>{t('admin.hr.otHours')}</th>
                  <th>{t('admin.hr.otRate')}</th>
                  <th>{t('admin.hr.otPay')}</th>
                  <th>{t('admin.hr.deduction')}</th>
                  <th>{t('admin.hr.netPay')}</th>
                  <th>{t('admin.table.status')}</th>
                  <th className="no-print" />
                </tr>
              </thead>
              <tbody>
                {adminStaff.map((s, i) => {
                  const otPay = s.att.ot * s.otRate;
                  const net = s.salary + otPay - s.deduction;
                  return (
                    <tr key={i}>
                      <td>
                        <div className="guest-cell">
                          <img src={`https://i.pravatar.cc/96?img=${s.avatar}`} alt="" />
                          <div>
                            <strong>{L(s.name)}</strong>
                            <span>{L(s.role)}</span>
                          </div>
                        </div>
                      </td>
                      <td>{fmtTaka(s.salary, n)}</td>
                      <td>{n(s.att.ot)} {t('admin.hr.hoursUnit')}</td>
                      <td>{s.otRate ? fmtTaka(s.otRate, n) : '—'}</td>
                      <td>{otPay ? fmtTaka(otPay, n) : '—'}</td>
                      <td style={{ color: 'var(--red)' }}>−{fmtTaka(s.deduction, n)}</td>
                      <td><b>{fmtTaka(net, n)}</b></td>
                      <td>
                        <span className={`badge ${s.payStatus === 'paid' ? 'b-green' : 'b-amber'}`}>
                          {t(`admin.hr.${s.payStatus}`)}
                        </span>
                      </td>
                      <td className="no-print">
                        <button className="text-link" style={{ fontSize: '.78rem' }} onClick={() => window.print()}>
                          <Icon name="printer" size={13} stroke={2} /> {t('admin.hr.payslip')}
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ background: 'var(--cream)' }}>
                  <td><b>{t('common.total')}</b></td>
                  <td><b>{fmtTaka(adminStaff.reduce((a, s) => a + s.salary, 0), n)}</b></td>
                  <td><b>{n(totalOt)} {t('admin.hr.hoursUnit')}</b></td>
                  <td />
                  <td><b>{fmtTaka(adminStaff.reduce((a, s) => a + s.att.ot * s.otRate, 0), n)}</b></td>
                  <td style={{ color: 'var(--red)' }}><b>−{fmtTaka(adminStaff.reduce((a, s) => a + s.deduction, 0), n)}</b></td>
                  <td><b style={{ color: 'var(--forest)' }}>{fmtTaka(payrollTotal, n)}</b></td>
                  <td colSpan={2} />
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
