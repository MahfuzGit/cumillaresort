'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLang } from '../lib/i18n';
import Icon from './Icons';
import ChatWidget from './ChatWidget';

export default function Footer() {
  const { t } = useLang();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="foot-grid">
            <div>
              <div className="foot-logo">
                <Icon name="leaf" size={28} stroke={1.6} />
                {t('brand.name')}
              </div>
              <p style={{ maxWidth: 300, fontSize: '.95rem' }}>{t('footer.blurb')}</p>
            </div>
            <div>
              <h4>{t('footer.explore')}</h4>
              <ul>
                <li><Link href="/about">{t('nav.about')}</Link></li>
                <li><Link href="/villas">{t('nav.villas')}</Link></li>
                <li><Link href="/experiences">{t('nav.experiences')}</Link></li>
                <li><Link href="/offers">{t('nav.offers')}</Link></li>
                <li><Link href="/gallery">{t('nav.gallery')}</Link></li>
                <li><Link href="/features">{t('nav.features')}</Link></li>
                <li><Link href="/events">{t('nav.events')}</Link></li>
                <li><Link href="/explore">{t('nav.explore')}</Link></li>
                <li><Link href="/faq">{t('nav.faq')}</Link></li>
                <li><Link href="/my-booking">{t('nav.myBooking')}</Link></li>
                <li><Link href="/reviews">{t('reviews.formTitle')}</Link></li>
              </ul>
            </div>
            <div>
              <h4>{t('footer.contactTitle')}</h4>
              <ul>
                <li>{t('contact.addressVal')}</li>
                <li>hello@cumillaresort.com</li>
                <li>+880 1711 555 123</li>
                <li><Link href="/admin/login">{t('footer.staffPortal')}</Link></li>
              </ul>
            </div>
            <div>
              <h4>{t('footer.newsletter')}</h4>
              <p style={{ fontSize: '.95rem', marginBottom: 18 }}>{t('footer.newsBlurb')}</p>
              <form
                className="news-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.target.reset();
                  alert(t('common.demoNote'));
                }}
              >
                <input type="email" placeholder={t('footer.emailPh')} aria-label={t('common.email')} required />
                <button type="submit">{t('common.subscribe')}</button>
              </form>
            </div>
          </div>
          <div className="foot-bottom">
            <span>{t('footer.rights')}</span>
            <span><Link href="/admin/login">{t('footer.mgmtDash')}</Link></span>
          </div>
        </div>
      </footer>

      <ChatWidget />

      <button
        className={`to-top${showTop ? ' show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={t('common.backToTop')}
      >
        <Icon name="arrowUp" size={20} stroke={2.4} />
      </button>
    </>
  );
}
