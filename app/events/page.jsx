'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { eventPackages, fmtTaka, IMG } from '../../lib/data';

export default function EventsPage() {
  const { t, n, L, lang } = useLang();
  const [sent, setSent] = useState(false);

  return (
    <>
      <Navbar solid />
      <PageHero title={t('events.pageTitle')} subtitle={t('events.pageSub')} image={IMG.heroOffers} />

      <section style={{ paddingTop: 64 }}>
        <div className="container">
          <div className="card-grid">
            {eventPackages.map((p, i) => (
              <Reveal key={i} delay={i + 1} className="card">
                <div className="card-media"><img src={p.img} alt={L(p.name)} loading="lazy" /></div>
                <div className="card-body">
                  <h3 className="serif">{L(p.name)}</h3>
                  <p style={{ fontSize: '.92rem', margin: '8px 0 14px' }}>{L(p.desc)}</p>
                  <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
                    {t('events.includes')}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {p.includes[lang].map((inc, j) => (
                      <li key={j} style={{ display: 'flex', gap: 8, fontSize: '.86rem', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--gold)', marginTop: 2 }}><Icon name="check" size={13} stroke={2.6} /></span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontWeight: 700, color: 'var(--forest)', fontSize: '1.05rem' }}>
                    {t('events.from')} {fmtTaka(p.price, n)}
                    <span style={{ display: 'block', fontSize: '.76rem', fontWeight: 500, color: 'var(--muted)' }}>{L(p.per)}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Inquiry form */}
          <Reveal style={{ maxWidth: 720, margin: '70px auto 0' }}>
            <div className="acard" style={{ borderLeft: '4px solid var(--gold)' }}>
              <h2 className="serif" style={{ marginBottom: 4 }}>{t('events.inqTitle')}</h2>
              <div className="hint" style={{ marginBottom: 18 }}>{t('events.inqHint')}</div>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '26px 0', color: 'var(--green)', fontWeight: 700 }}>
                  <Icon name="check" size={28} stroke={2.4} />
                  <p style={{ marginTop: 10 }}>{t('events.sent')}</p>
                </div>
              ) : (
                <form className="form-grid" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="field">
                    <label htmlFor="ev-name">{t('events.name')}</label>
                    <input id="ev-name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="ev-phone">{t('events.phone')}</label>
                    <input id="ev-phone" required />
                  </div>
                  <div className="field">
                    <label htmlFor="ev-date">{t('events.date')}</label>
                    <input id="ev-date" type="date" min="2026-07-01" required />
                  </div>
                  <div className="field">
                    <label htmlFor="ev-type">{t('events.type')}</label>
                    <select id="ev-type">
                      {t('events.types').map((ty, i) => <option key={i}>{ty}</option>)}
                    </select>
                  </div>
                  <div className="field" style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="ev-msg">{t('events.msg')}</label>
                    <textarea id="ev-msg" style={{ minHeight: 90 }} />
                  </div>
                  <button className="btn btn-gold" type="submit" style={{ gridColumn: '1 / -1' }}>{t('events.send')}</button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
