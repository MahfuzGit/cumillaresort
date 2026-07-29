'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { faqs, IMG } from '../../lib/data';

export default function FaqPage() {
  const { t, L } = useLang();
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <>
      <Navbar solid />
      <PageHero title={t('faqPage.pageTitle')} subtitle={t('faqPage.pageSub')} image={IMG.heroAbout} />

      <section style={{ paddingTop: 64 }}>
        <div className="container" style={{ maxWidth: 780 }}>
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={i} delay={(i % 4) + 1}>
                <div style={{ border: '1.5px solid var(--cream)', borderRadius: 14, marginBottom: 12, overflow: 'hidden', background: '#fff' }}>
                  <button
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    aria-expanded={open}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '17px 20px', background: open ? 'var(--cream)' : '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
                  >
                    <span style={{ flex: 1, fontWeight: 700, fontSize: '1rem', color: 'var(--forest)' }}>{L(f.q)}</span>
                    <span style={{ color: 'var(--gold)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s', display: 'flex' }}>
                      <Icon name="arrowUp" size={16} stroke={2.2} />
                    </span>
                  </button>
                  {open && (
                    <p style={{ margin: 0, padding: '15px 20px 19px', fontSize: '.94rem', lineHeight: 1.75, color: 'var(--ink)' }}>{L(f.a)}</p>
                  )}
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
