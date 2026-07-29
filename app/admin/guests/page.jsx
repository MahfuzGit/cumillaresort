'use client';
import { useRouter } from 'next/navigation';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { adminGuests, fmtTaka } from '../../../lib/data';

export default function GuestsPage() {
  const { t, n, L } = useLang();
  const router = useRouter();
  return (
    <>
      <AdminTopbar title={t('admin.guests.title')} sub={t('admin.guests.sub')} />
      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.guests.dirTitle')}</h2>
            <div className="hint">{t('admin.guests.dirHint')}</div>
          </div>
          <button className="btn-admin" onClick={() => alert(t('common.demoNote'))}>
            <Icon name="plus" size={15} stroke={2.4} /> {t('admin.guests.addGuest')}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.table.guest')}</th><th>{t('admin.table.villa')}</th><th>{t('admin.table.stay')}</th>
                <th>{t('admin.table.preferences')}</th><th>{t('admin.table.spend')}</th><th>{t('admin.table.tier')}</th>
              </tr>
            </thead>
            <tbody>
              {adminGuests.map((g, i) => (
                <tr key={i} style={{ cursor: 'pointer' }} onClick={() => router.push(`/admin/guests/${i}`)}>
                  <td>
                    <div className="guest-cell">
                      <img src={`https://i.pravatar.cc/96?img=${g.avatar}`} alt="" />
                      <div>
                        <strong>{L(g.name)}</strong>
                        <span>{L(g.from)}</span>
                      </div>
                    </div>
                  </td>
                  <td>{L(g.villa)}</td>
                  <td>{L(g.stay)}</td>
                  <td>{L(g.prefs)}</td>
                  <td><b>{fmtTaka(g.spend, n)}</b></td>
                  <td><StatusBadge status={g.tier} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
