'use client';
import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { villas, fmtTaka } from '../../lib/data';

function nightsBetween(a, b) {
  const ms = new Date(b) - new Date(a);
  return Math.max(1, Math.round(ms / 86400000));
}

// Generate a booking ref like NR-2026-1043
function genRef() {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `NR-${year}-${rand}`;
}

function BookingWizard() {
  const { t, n, L } = useLang();
  const params = useSearchParams();
  const preselect = params.get('villa');

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    checkIn: '2026-07-12',
    checkOut: '2026-07-15',
    adults: 2,
    children: 0,
    villa: preselect && villas.some((v) => v.slug === preselect) ? preselect : villas[0].slug,
    name: '',
    email: '',
    phone: '',
    special: '',
  });

  const villa = villas.find((v) => v.slug === form.villa);
  const nights = useMemo(() => nightsBetween(form.checkIn, form.checkOut), [form.checkIn, form.checkOut]);
  const total = villa.price * nights;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const steps = t('booking.steps');

  const confirmBooking = async () => {
    setSubmitting(true);
    const ref = genRef();
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ref,
          guest_name: form.name,
          guest_email: form.email,
          guest_phone: form.phone || null,
          villa_slug: villa.slug,
          villa_name: villa.name.en,
          check_in: form.checkIn,
          check_out: form.checkOut,
          nights,
          adults: Number(form.adults),
          children: Number(form.children),
          price_per_night: villa.price,
          total,
          notes: form.special || null,
        }),
      });
    } catch { /* ignore if Supabase unconfigured — ref still shown to user */ }
    setBookingRef(ref);
    setDone(true);
    setSubmitting(false);
  };

  if (done) {
    return (
      <div className="book-panel center" style={{ padding: '54px 34px' }}>
        <div className="success-icon"><Icon name="check" size={40} stroke={2.6} /></div>
        <h2 className="sec" style={{ fontSize: '1.9rem' }}>{t('booking.confirmedTitle')}</h2>
        <p className="lead" style={{ margin: '0 auto 8px' }}>{t('booking.confirmedSub')}</p>
        <div className="price" style={{ fontSize: '1.6rem', margin: '10px 0 22px' }}>{bookingRef}</div>
        <p style={{ color: 'var(--muted)', fontSize: '.92rem', marginBottom: 28 }}>{t('booking.payNote')}</p>
        <Link href="/" className="btn btn-gold">{t('booking.backHome')}</Link>
      </div>
    );
  }

  return (
    <>
      {/* Step indicator */}
      <div className="steps">
        {steps.map((s, i) => (
          <div key={i} className={`step${i === step ? ' on' : ''}${i < step ? ' done' : ''}`}>
            <div className="dot">{i < step ? <Icon name="check" size={17} stroke={2.6} /> : n(i + 1)}</div>
            {s}
          </div>
        ))}
      </div>

      <div className="book-panel">
        {/* STEP 1: dates & guests */}
        {step === 0 && (
          <div className="form-grid">
            <div className="field">
              <label htmlFor="b-in">{t('common.checkIn')}</label>
              <input id="b-in" type="date" value={form.checkIn} onChange={set('checkIn')} />
            </div>
            <div className="field">
              <label htmlFor="b-out">{t('common.checkOut')}</label>
              <input id="b-out" type="date" value={form.checkOut} onChange={set('checkOut')} />
            </div>
            <div className="field">
              <label htmlFor="b-ad">{t('common.adults')}</label>
              <select id="b-ad" value={form.adults} onChange={set('adults')}>
                {[1, 2, 3, 4, 5, 6].map((x) => <option key={x} value={x}>{n(x)}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="b-ch">{t('common.children')}</label>
              <select id="b-ch" value={form.children} onChange={set('children')}>
                {[0, 1, 2, 3, 4].map((x) => <option key={x} value={x}>{n(x)}</option>)}
              </select>
            </div>
            <div className="field full" style={{ alignItems: 'flex-end' }}>
              <span style={{ fontSize: '.9rem', color: 'var(--muted)' }}>
                {t('booking.stayLength')}: <b style={{ color: 'var(--forest)' }}>{n(nights)} {t('common.nights')}</b>
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: villa */}
        {step === 1 && (
          <div className="villa-pick">
            {villas.map((v) => (
              <div
                key={v.slug}
                className={`opt${form.villa === v.slug ? ' sel' : ''}`}
                onClick={() => setForm({ ...form, villa: v.slug })}
                role="radio"
                aria-checked={form.villa === v.slug}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setForm({ ...form, villa: v.slug })}
              >
                <img src={v.img} alt={L(v.name)} loading="lazy" />
                <div>
                  <strong>{L(v.name)}</strong>
                  <span>{fmtTaka(v.price, n)} {t('common.perNight')} · {n(v.guests)} {t('common.guests')}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 3: details */}
        {step === 2 && (
          <div className="form-grid">
            <div className="field">
              <label htmlFor="b-name">{t('common.name')}</label>
              <input id="b-name" value={form.name} onChange={set('name')} required />
            </div>
            <div className="field">
              <label htmlFor="b-email">{t('common.email')}</label>
              <input id="b-email" type="email" value={form.email} onChange={set('email')} required />
            </div>
            <div className="field full">
              <label htmlFor="b-phone">{t('common.phone')}</label>
              <input id="b-phone" type="tel" placeholder="+880" value={form.phone} onChange={set('phone')} />
            </div>
            <div className="field full">
              <label htmlFor="b-special">{t('booking.special')}</label>
              <textarea id="b-special" placeholder={t('booking.specialPh')} value={form.special} onChange={set('special')} />
            </div>
          </div>
        )}

        {/* STEP 4: review */}
        {step === 3 && (
          <div>
            <h3 style={{ color: 'var(--forest)', fontSize: '1.3rem', marginBottom: 18 }}>{t('booking.summary')}</h3>
            <div className="summary-box">
              <div className="row"><span>{t('booking.villa')}</span><b>{L(villa.name)}</b></div>
              <div className="row"><span>{t('booking.dates')}</span><b>{form.checkIn} → {form.checkOut}</b></div>
              <div className="row"><span>{t('booking.stayLength')}</span><b>{n(nights)} {t('common.nights')}</b></div>
              <div className="row"><span>{t('common.guests')}</span><b>{n(form.adults)} {t('common.adults')}, {n(form.children)} {t('common.children')}</b></div>
              <div className="row"><span>{t('booking.priceNight')}</span><b>{fmtTaka(villa.price, n)}</b></div>
              <div className="row total"><span>{t('common.total')}</span><b>{fmtTaka(total, n)}</b></div>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '.88rem', marginTop: 16 }}>{t('booking.payNote')}</p>
          </div>
        )}

        {/* Nav buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30, gap: 12 }}>
          <button className="btn btn-outline btn-sm" onClick={() => setStep(Math.max(0, step - 1))} style={{ visibility: step === 0 ? 'hidden' : 'visible' }}>
            {t('common.back')}
          </button>
          {step < 3 ? (
            <button className="btn btn-gold btn-sm" onClick={() => setStep(step + 1)}>
              {t('common.next')} <Icon name="arrowRight" size={15} stroke={2.4} />
            </button>
          ) : (
            <button
              className="btn btn-gold btn-sm"
              onClick={confirmBooking}
              disabled={submitting}
              style={{ opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? '...' : <>{t('common.confirm')} <Icon name="check" size={15} stroke={2.6} /></>}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default function BookingPage() {
  const { t } = useLang();
  return (
    <>
      <Navbar solid />
      <section style={{ paddingTop: 150, minHeight: '80vh' }}>
        <div className="container">
          <Reveal className="center" style={{ marginBottom: 48 }}>
            <span className="eyebrow center">{t('brand.full')}</span>
            <h1 className="sec serif" style={{ fontSize: 'clamp(2rem,4.6vw,3rem)', color: 'var(--forest)' }}>{t('booking.pageTitle')}</h1>
            <p className="lead" style={{ margin: '0 auto' }}>{t('booking.pageSub')}</p>
          </Reveal>
          <Suspense fallback={null}>
            <BookingWizard />
          </Suspense>
        </div>
      </section>
      <Footer />
    </>
  );
}
