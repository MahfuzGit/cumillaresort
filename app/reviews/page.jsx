'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { villas, IMG } from '../../lib/data';

export default function ReviewsPage() {
  const { t, n, L } = useLang();
  const [name, setName] = useState('');
  const [villaIdx, setVillaIdx] = useState(0);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [list, setList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  // Fetch approved reviews from Neon/API (falls back to empty if unconfigured)
  useEffect(() => {
    async function fetchReviews() {
      setLoadingList(true);
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setList(data);
          }
        }
      } catch { /* API unconfigured — no reviews shown */ }
      setLoadingList(false);
    }
    fetchReviews();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const villa = villas[villaIdx];
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_name: name.trim(),
          rating,
          comment: text.trim(),
          villa_slug: villa.slug,
          villa_name: villa.name.en,
        }),
      });
      if (!res.ok) {
        console.warn('[Reviews] Submission failed:', res.statusText);
      }
    } catch { /* ignore if unconfigured */ }
    setSent(true);
    setSubmitting(false);
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <Navbar solid />
      <PageHero title={t('reviews.pageTitle')} subtitle={t('reviews.pageSub')} image={IMG.heroGallery} />

      <section style={{ paddingTop: 64 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="acard" style={{ borderLeft: '4px solid var(--gold)', marginBottom: 36 }}>
              <h2 className="serif" style={{ marginBottom: 16 }}>{t('reviews.formTitle')}</h2>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--green)', fontWeight: 700 }}>
                  <Icon name="check" size={28} stroke={2.4} />
                  <p style={{ marginTop: 10 }}>{t('reviews.thanks')}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '.88rem', fontWeight: 400, marginTop: 6 }}>
                    Your review will appear after admin approval.
                  </p>
                </div>
              ) : (
                <form className="form-grid" onSubmit={submit}>
                  <div className="field">
                    <label htmlFor="rv-name">{t('reviews.name')}</label>
                    <input id="rv-name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label htmlFor="rv-villa">{t('reviews.villa')}</label>
                    <select id="rv-villa" value={villaIdx} onChange={(e) => setVillaIdx(Number(e.target.value))}>
                      {villas.map((v, i) => <option key={v.slug} value={i}>{L(v.name)}</option>)}
                    </select>
                  </div>
                  <div className="field" style={{ gridColumn: '1 / -1' }}>
                    <label>{t('reviews.rating')}</label>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[1, 2, 3, 4, 5].map((r) => (
                        <button key={r} type="button" onClick={() => setRating(r)} aria-label={`${r} stars`}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.7rem', color: r <= rating ? 'var(--gold)' : 'var(--cream)', lineHeight: 1 }}>
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="field" style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="rv-text">{t('reviews.comment')}</label>
                    <textarea id="rv-text" value={text} onChange={(e) => setText(e.target.value)} placeholder={t('reviews.commentPh')} style={{ minHeight: 110 }} required />
                  </div>
                  <button className="btn btn-gold" type="submit" style={{ gridColumn: '1 / -1', opacity: submitting ? 0.7 : 1 }} disabled={submitting}>
                    {submitting ? '...' : t('reviews.submit')}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {!loadingList && list.length > 0 && (
            <Reveal>
              <h2 className="serif" style={{ marginBottom: 18 }}>{t('reviews.recent')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {list.map((r) => (
                  <div key={r.id} className="acard" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
                      <strong>{r.guest_name}</strong>
                      <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
                        {r.villa_name} · {formatDate(r.created_at)}
                      </span>
                      <span style={{ color: 'var(--gold)', fontWeight: 700 }}>
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '.92rem', lineHeight: 1.65 }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
