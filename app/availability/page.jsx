'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import { useLang } from '../../lib/i18n';
import { publicRoomBookings, roomTypes, isRoomFree, IMG } from '../../lib/data';

// Localize an ISO date (2026-06-12) as "12 Jun" / "১২ জুন"
const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  bn: ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'],
};

export default function AvailabilityPage() {
  const { t, n, lang, L } = useLang();
  const router = useRouter();
  const [from, setFrom] = useState('2026-06-12');
  const [to, setTo] = useState('2026-06-15');

  // Accept ?in=&out= from the homepage booking bar
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('in')) setFrom(p.get('in'));
    if (p.get('out')) setTo(p.get('out'));
  }, []);

  const valid = from && to && to > from;
  const fmt = (iso) => {
    const [, m, d] = iso.split('-').map(Number);
    return `${n(d)} ${MONTHS[lang][m - 1]}`;
  };

  const freeCount = valid ? publicRoomBookings.filter((r) => isRoomFree(r, from, to)).length : 0;

  return (
    <>
      <Navbar solid />
      <PageHero title={t('avail.pageTitle')} subtitle={t('avail.pageSub')} image={IMG.heroVillas} />

      <section style={{ paddingTop: 56 }}>
        <div className="container">
          {/* Date picker + live badge */}
          <Reveal>
            <div className="acard" style={{ display: 'flex', gap: 18, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 14 }}>
              <div>
                <label htmlFor="av-in" style={{ display: 'block', fontSize: '.78rem', fontWeight: 700, color: 'var(--muted)', marginBottom: 6 }}>{t('avail.from')}</label>
                <input id="av-in" type="date" value={from} min="2026-06-11" max="2026-08-31"
                  onChange={(e) => setFrom(e.target.value)}
                  style={{ padding: '11px 13px', borderRadius: 10, border: '1.5px solid var(--cream)', fontFamily: 'inherit', fontSize: '.92rem' }} />
              </div>
              <div>
                <label htmlFor="av-out" style={{ display: 'block', fontSize: '.78rem', fontWeight: 700, color: 'var(--muted)', marginBottom: 6 }}>{t('avail.to')}</label>
                <input id="av-out" type="date" value={to} min="2026-06-12" max="2026-09-01"
                  onChange={(e) => setTo(e.target.value)}
                  style={{ padding: '11px 13px', borderRadius: 10, border: '1.5px solid var(--cream)', fontFamily: 'inherit', fontSize: '.92rem' }} />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                {valid ? (
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--forest)' }}>
                    {lang === 'bn'
                      ? `${n(32)}টির মধ্যে ${n(freeCount)}টি ভিলা খালি`
                      : `${n(freeCount)} of ${n(32)} villas free`}
                    <span style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--muted)' }}>
                      {t('avail.forDates')} {fmt(from)} → {fmt(to)}
                    </span>
                  </div>
                ) : (
                  <div style={{ fontSize: '.9rem', color: 'var(--red)' }}>{t('avail.invalidRange')}</div>
                )}
              </div>
              <span className="live-pill">
                <span className="live-dot" />
                {t('avail.liveNow')}
              </span>
            </div>
          </Reveal>

          {/* Legend */}
          <Reveal>
            <div className="legend" style={{ marginBottom: 26 }}>
              <span><i style={{ background: 'var(--green)' }} />{t('avail.available')}</span>
              <span><i style={{ background: 'var(--red)' }} />{t('avail.booked')}</span>
            </div>
          </Reveal>

          {/* Rooms grouped by villa type */}
          {valid && roomTypes.map((rt) => {
            const rooms = publicRoomBookings.filter((r) => r.typeKey === rt.key);
            const freeOfType = rooms.filter((r) => isRoomFree(r, from, to)).length;
            return (
              <Reveal key={rt.key} style={{ marginBottom: 34 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                  <h2 className="serif" style={{ fontSize: '1.3rem', color: 'var(--forest)' }}>{L(rt.label)}</h2>
                  <span className={`badge ${freeOfType > 0 ? 'b-green' : 'b-red'}`}>
                    {n(freeOfType)} / {n(rooms.length)} {t('avail.available')}
                  </span>
                </div>
                <div className="room-status-grid">
                  {rooms.map((r) => {
                    const free = isRoomFree(r, from, to);
                    return (
                      <div key={r.no} className="room-chip" style={{ borderTop: `3px solid ${free ? 'var(--green)' : 'var(--red)'}`, cursor: free ? 'pointer' : 'default' }}
                        onClick={free ? () => router.push('/booking') : undefined}>
                        <div className="no">{n(r.no)}</div>
                        <div className="type">{L(r.label)}</div>
                        <span className={`badge ${free ? 'b-green' : 'b-red'}`}>
                          {free ? t('avail.available') : t('avail.booked')}
                        </span>
                        <div style={{ fontSize: '.68rem', color: 'var(--muted)', marginTop: 7, lineHeight: 1.7 }}>
                          {r.bookings.length
                            ? <>
                                {t('avail.bookedRanges')}{' '}
                                {r.bookings.map((b, j) => (
                                  <span key={j} style={{ whiteSpace: 'nowrap', fontWeight: (b.from < to && b.to > from) ? 700 : 400, color: (b.from < to && b.to > from) ? 'var(--red)' : undefined }}>
                                    {fmt(b.from)}–{fmt(b.to)}{j < r.bookings.length - 1 ? ', ' : ''}
                                  </span>
                                ))}
                              </>
                            : t('avail.allFree')}
                        </div>
                        {free && (
                          <button className="btn btn-gold" style={{ marginTop: 9, padding: '7px 16px', fontSize: '.72rem' }}
                            onClick={(e) => { e.stopPropagation(); router.push('/booking'); }}>
                            {t('avail.bookThis')}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
