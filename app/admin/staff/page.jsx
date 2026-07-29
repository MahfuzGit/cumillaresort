'use client';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { adminStaff } from '../../../lib/data';

const SHIFT_KEY = { morning: 'morning', evening: 'evening', night: 'nightShift' };

export default function StaffPage() {
  const { t, L } = useLang();
  return (
    <>
      <AdminTopbar title={t('admin.staff.title')} sub={t('admin.staff.sub')} />
      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.staff.rosterTitle')}</h2>
            <div className="hint">{t('admin.staff.rosterHint')}</div>
          </div>
          <button className="btn-admin" onClick={() => alert(t('common.demoNote'))}>
            <Icon name="plus" size={15} stroke={2.4} /> {t('admin.staff.addStaff')}
          </button>
        </div>
        <div className="staff-grid">
          {adminStaff.map((s, i) => (
            <div className="staff-card" key={i} onClick={() => alert(t('common.demoNote'))}>
              <img src={`https://i.pravatar.cc/200?img=${s.avatar}`} alt={L(s.name)} loading="lazy" />
              <h3 className="serif">{L(s.name)}</h3>
              <div className="role">{L(s.role)}</div>
              <div className="dept">{L(s.dept)} · {t(`admin.staff.${SHIFT_KEY[s.shift]}`)}</div>
              <StatusBadge status={s.status} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
