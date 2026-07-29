'use client';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { adminTasks, adminStaff, cleaningLog } from '../../../lib/data';

const COND_COLOR = { good: 'b-green', fair: 'b-amber', needsRepair: 'b-red' };
const INSP_COLOR = { inspected: 'b-blue', pendingInsp: 'b-grey' };

export default function HousekeepingPage() {
  const { t, n, L } = useLang();
  const condCounts = {
    good: cleaningLog.filter((c) => c.condition === 'good').length,
    fair: cleaningLog.filter((c) => c.condition === 'fair').length,
    needsRepair: cleaningLog.filter((c) => c.condition === 'needsRepair').length,
  };
  return (
    <>
      <AdminTopbar title={t('admin.housekeeping.title')} sub={t('admin.housekeeping.sub')} />
      <div className="acard" style={{ marginBottom: 18 }}>
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.housekeeping.queueTitle')}</h2>
            <div className="hint">{t('admin.housekeeping.queueHint')}</div>
          </div>
          <button className="btn-admin" onClick={() => alert(t('common.demoNote'))}>
            <Icon name="plus" size={15} stroke={2.4} /> {t('admin.housekeeping.assign')}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.table.villa')}</th><th>{t('admin.table.task')}</th><th>{t('admin.table.team')}</th>
                <th>{t('admin.table.priority')}</th><th>{t('admin.table.due')}</th><th>{t('admin.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {adminTasks.map((task, i) => (
                <tr key={i} onClick={() => alert(t('common.demoNote'))}>
                  <td><b>{L(task.villa)}</b></td>
                  <td>{L(task.task)}</td>
                  <td>{L(task.team)}</td>
                  <td><StatusBadge status={task.priority} /></td>
                  <td>{n(task.due)}</td>
                  <td><StatusBadge status={task.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------- CLEANING LOG: who cleaned which villa ---------- */}
      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.housekeeping.logTitle')}</h2>
            <div className="hint">{t('admin.housekeeping.logHint')}</div>
          </div>
          {/* Room condition summary chips */}
          <div className="legend" aria-label={t('admin.housekeeping.condSummary')}>
            <span className="badge b-green">{t('admin.housekeeping.good')}: {n(condCounts.good)}</span>
            <span className="badge b-amber">{t('admin.housekeeping.fair')}: {n(condCounts.fair)}</span>
            <span className="badge b-red">{t('admin.housekeeping.needsRepair')}: {n(condCounts.needsRepair)}</span>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.table.villa')}</th>
                <th>{t('admin.housekeeping.cleaner')}</th>
                <th>{t('admin.table.due')}</th>
                <th>{t('admin.housekeeping.duration')}</th>
                <th>{t('admin.housekeeping.condition')}</th>
                <th>{t('admin.housekeeping.inspection')}</th>
              </tr>
            </thead>
            <tbody>
              {cleaningLog.map((c, i) => {
                const cleaner = adminStaff[c.cleanerIdx];
                return (
                  <tr key={i} onClick={() => alert(t('common.demoNote'))}>
                    <td><b>{L(c.villa)}</b></td>
                    <td>
                      <div className="guest-cell">
                        <img src={`https://i.pravatar.cc/96?img=${cleaner.avatar}`} alt="" />
                        <div>
                          <strong>{L(cleaner.name)}</strong>
                          <span>{L(cleaner.role)}</span>
                        </div>
                      </div>
                    </td>
                    <td>{n(c.time)}</td>
                    <td>{n(c.mins)} {t('admin.housekeeping.mins')}</td>
                    <td><span className={`badge ${COND_COLOR[c.condition]}`}>{t(`admin.housekeeping.${c.condition}`)}</span></td>
                    <td><span className={`badge ${INSP_COLOR[c.inspection]}`}>{t(`admin.housekeeping.${c.inspection}`)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
