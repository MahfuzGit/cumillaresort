'use client';
import { useEffect, useState } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { feedbackLog } from '../../../lib/data';

export default function FeedbackPage() {
  const { t, n, L } = useLang();
  const [dbReviews, setDbReviews] = useState([]);
  const [resolved, setResolved] = useState(new Set()); // ids resolved this session

  // Fetch all reviews from Neon/API (including unapproved — admin sees all)
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/admin/reviews');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setDbReviews(data.map((r) => ({
              id: r.id,
              avatar: 65,
              guest: { en: r.guest_name, bn: r.guest_name },
              villa: { en: r.villa_name || '—', bn: r.villa_name || '—' },
              type: r.rating >= 4 ? 'praise' : 'complaint',
              rating: r.rating,
              date: { en: new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), bn: '' },
              status: r.approved ? 'resolved' : 'open',
              text: { en: r.comment, bn: r.comment },
            })));
          }
        }
      } catch { /* API unconfigured — use mock */ }
    }
    fetchReviews();
  }, []);

  const approveReview = async (review, i) => {
    if (review.id) {
      // Real row
      try {
        const res = await fetch('/api/admin/reviews', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: review.id }),
        });
        if (res.ok) {
          setDbReviews((prev) => prev.map((r) => r.id === review.id ? { ...r, status: 'resolved' } : r));
        }
      } catch { /* ignore */ }
    } else {
      // Mock data row — just mark locally
      setResolved((prev) => new Set([...prev, i]));
    }
  };

  // Merge: DB reviews first, then mock feedbackLog (mock has no real id)
  const allFeedback = [...dbReviews, ...feedbackLog.map((f) => ({ ...f, id: null }))];
  const statusOf = (f, i) => {
    if (f.id) return f.status; // DB row
    return resolved.has(i) ? 'resolved' : f.status;
  };

  const openCount = allFeedback.filter((f, i) => statusOf(f, i) === 'open' || statusOf(f, i) === 'inProgress').length;
  const resolvedCount = allFeedback.length - openCount;
  const avgRating = allFeedback.length > 0
    ? (allFeedback.reduce((a, f) => a + f.rating, 0) / allFeedback.length).toFixed(1)
    : '0.0';

  const kpis = [
    { label: t('admin.feedback.openCount'), val: n(openCount), icon: 'alert', bg: 'rgba(192,69,44,.12)', color: 'var(--red)' },
    { label: t('admin.feedback.resolvedCount'), val: n(resolvedCount), icon: 'check', bg: 'rgba(30,142,90,.12)', color: 'var(--green)' },
    { label: t('admin.feedback.avgRating'), val: `${n(avgRating)} / ${n(5)}`, icon: 'star', bg: 'rgba(201,162,39,.14)', color: 'var(--gold)' },
    { label: t('admin.feedback.totalCount'), val: n(allFeedback.length), icon: 'heart', bg: 'rgba(45,108,181,.12)', color: 'var(--blue)' },
  ];

  return (
    <>
      <AdminTopbar title={t('admin.feedback.title')} sub={t('admin.feedback.sub')} />

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

      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.feedback.listTitle')}</h2>
            <div className="hint">{t('admin.feedback.listHint')}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {allFeedback.map((f, i) => {
            const st = statusOf(f, i);
            return (
              <div key={f.id || i} style={{ border: '1.5px solid var(--cream)', borderRadius: 13, padding: '15px 17px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <img src={`https://i.pravatar.cc/96?img=${f.avatar}`} alt="" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                    <strong style={{ fontSize: '.94rem' }}>{L(f.guest)}</strong>
                    <span style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{L(f.villa)} · {L(f.date)}</span>
                    <StatusBadge status={f.type} />
                    <span style={{ color: 'var(--gold)', fontSize: '.8rem', fontWeight: 700 }}>
                      {'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '.9rem', lineHeight: 1.6 }}>{L(f.text)}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', flexShrink: 0 }}>
                  <StatusBadge status={st} />
                  {st !== 'resolved' && (
                    <button className="btn-admin no-print" style={{ padding: '7px 12px', fontSize: '.74rem' }}
                      onClick={() => approveReview(f, i)}>
                      <Icon name="check" size={13} stroke={2.4} /> {t('admin.feedback.resolveBtn')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
