'use client';
import { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { IMG } from '../../lib/data';

export default function ContactPage() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.target);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone') || null,
          message: fd.get('message'),
        }),
      });
    } catch { /* ignore if unconfigured */ }
    setSent(true);
    setSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <PageHero title={t('contact.pageTitle')} subtitle={t('contact.pageSub')} image={IMG.heroContact} />
      <section>
        <div className="container">
          {/* Info cards */}
          <div className="card-grid" style={{ marginBottom: 60 }}>
            {[
              { icon: 'pin', title: t('contact.address'), val: t('contact.addressVal') },
              { icon: 'phone', title: t('contact.phoneTitle'), val: '+880 1711 555 123' },
              { icon: 'mail', title: t('contact.emailTitle'), val: 'hello@cumillaresort.com' },
            ].map((c, i) => (
              <Reveal key={i} delay={i + 1} className="quote-card" style={{ textAlign: 'center', alignItems: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: 'rgba(201,162,39,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                  <Icon name={c.icon} size={25} />
                </div>
                <h3 style={{ color: 'var(--forest)', fontSize: '1.12rem' }}>{c.title}</h3>
                <p style={{ fontStyle: 'normal', fontSize: '.93rem', color: 'var(--muted)' }}>{c.val}</p>
              </Reveal>
            ))}
          </div>

          <div className="detail-grid">
            {/* Form */}
            <Reveal variant="left">
              <h2 className="sec" style={{ fontSize: '1.7rem', marginBottom: 28 }}>{t('contact.formTitle')}</h2>
              {sent ? (
                <div className="quote-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                  <div className="success-icon"><Icon name="check" size={38} stroke={2.6} /></div>
                  <p style={{ fontStyle: 'normal' }}>{t('contact.sent')}</p>
                </div>
              ) : (
                <form className="form-grid" ref={formRef} onSubmit={handleSubmit}>
                  <div className="field">
                    <label htmlFor="c-name">{t('common.name')}</label>
                    <input id="c-name" name="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">{t('common.email')}</label>
                    <input id="c-email" name="email" type="email" required />
                  </div>
                  <div className="field full">
                    <label htmlFor="c-phone">{t('common.phone')}</label>
                    <input id="c-phone" name="phone" type="tel" placeholder="+880" />
                  </div>
                  <div className="field full">
                    <label htmlFor="c-msg">{t('common.message')}</label>
                    <textarea id="c-msg" name="message" placeholder={t('contact.msgPlaceholder')} required />
                  </div>
                  <div className="field full">
                    <button
                      className="btn btn-gold"
                      type="submit"
                      style={{ justifySelf: 'start', opacity: submitting ? 0.7 : 1 }}
                      disabled={submitting}
                    >
                      {submitting ? '...' : t('common.send')}
                    </button>
                  </div>
                </form>
              )}
            </Reveal>

            {/* Map */}
            <Reveal variant="right">
              <h2 className="sec" style={{ fontSize: '1.7rem', marginBottom: 28 }}>{t('contact.mapTitle')}</h2>
              <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: '0 16px 44px rgba(14,33,29,.12)', border: '1px solid var(--line)', marginBottom: 20 }}>
                <iframe
                  title="Google Map of Cumilla Resort"
                  src="https://maps.google.com/maps?q=Lalmai%20Hills,%20Cumilla,%20Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  style={{ width: '100%', height: 420, border: 0, display: 'block' }}
                  loading="lazy"
                />
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Lalmai+Hills,+Cumilla"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <Icon name="pin" size={16} />
                {t('contact.getDirections') || 'Get Directions'}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
