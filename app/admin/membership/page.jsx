'use client';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { members, memberTiers, tierOfPoints, fmtTaka } from '../../../lib/data';

export default function MembershipPage() {
  const { t, n, L, lang } = useLang();

  const sorted = [...members].sort((a, b) => b.points - a.points);
  const countOf = (tier) => members.filter((m) => tierOfPoints(m.points) === tier).length;

  const kpis = [
    { label: t('admin.membership.totalMembers'), val: n(members.length), icon: 'users', bg: 'rgba(45,108,181,.12)', color: 'var(--blue)' },
    { label: t('admin.membership.platinumCount'), val: n(countOf('platinum')), icon: 'award', bg: 'rgba(30,142,90,.12)', color: 'var(--green)' },
    { label: t('admin.membership.goldCount'), val: n(countOf('gold')), icon: 'star', bg: 'rgba(185,123,15,.13)', color: 'var(--amber)' },
    { label: t('admin.membership.starCount'), val: n(countOf('star')), icon: 'star', bg: 'rgba(45,108,181,.10)', color: 'var(--blue)' },
  ];

  return (
    <>
      <AdminTopbar title={t('admin.membership.title')} sub={t('admin.membership.sub')} />

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

      {/* -------- TIER CARDS -------- */}
      <div className="acard" style={{ marginBottom: 18 }}>
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.membership.tiersTitle')}</h2>
            <div className="hint">{t('admin.membership.tiersHint')}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {memberTiers.map((tier) => (
            <div key={tier.key} style={{ border: '1.5px solid var(--cream)', borderTop: `4px solid ${tier.color}`, borderRadius: 14, padding: '18px 18px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <h3 className="serif" style={{ fontSize: '1.15rem', color: tier.color }}>{t(`admin.status.${tier.key}`)}</h3>
                <Icon name={tier.key === 'platinum' ? 'award' : 'star'} size={20} className="" />
              </div>
              <div style={{ fontSize: '.78rem', color: 'var(--muted)', marginBottom: 12 }}>
                {t('admin.membership.pointsRange')}:{' '}
                {tier.max === Infinity
                  ? `${n(tier.min.toLocaleString('en-US'))} ${t('admin.membership.andAbove')}`
                  : `${n(tier.min.toLocaleString('en-US'))} – ${n(tier.max.toLocaleString('en-US'))}`}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7, padding: 0, margin: 0 }}>
                {tier.benefits[lang].map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: '.85rem', alignItems: 'flex-start' }}>
                    <span style={{ color: tier.color, marginTop: 2 }}><Icon name="check" size={13} stroke={2.6} /></span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* -------- MEMBERS TABLE -------- */}
      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.membership.membersTitle')}</h2>
            <div className="hint">{t('admin.membership.membersHint')}</div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.membership.member')}</th>
                <th>{t('admin.guests.phone')}</th>
                <th>{t('admin.membership.sinceLbl')}</th>
                <th>{t('admin.membership.visitsLbl')}</th>
                <th>{t('admin.membership.spendLbl')}</th>
                <th>{t('admin.membership.points')}</th>
                <th>{t('admin.membership.tier')}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((m, i) => (
                <tr key={i}>
                  <td>
                    <div className="guest-cell">
                      <img src={`https://i.pravatar.cc/96?img=${m.avatar}`} alt="" />
                      <strong>{L(m.name)}</strong>
                    </div>
                  </td>
                  <td style={{ fontSize: '.85rem', color: 'var(--muted)' }}>{m.phone}</td>
                  <td>{n(m.since)}</td>
                  <td>{n(m.visits)}</td>
                  <td>{fmtTaka(m.spend, n)}</td>
                  <td><b style={{ color: 'var(--forest)' }}>{n(m.points.toLocaleString('en-US'))}</b></td>
                  <td><StatusBadge status={tierOfPoints(m.points)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
