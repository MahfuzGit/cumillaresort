'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { attractions, IMG } from '../../lib/data';

export default function ExplorePage() {
  const { t, n, L } = useLang();

  return (
    <>
      <Navbar solid />
      <PageHero title={t('explore.pageTitle')} subtitle={t('explore.pageSub')} image={IMG.heroExp} />

      <section style={{ paddingTop: 64 }}>
        <div className="container">
          {attractions.map((a, i) => (
            <div key={i} className={`exp-row${i % 2 ? ' flip' : ''}`}>
              <Reveal variant={i % 2 ? 'right' : 'left'} className="exp-media">
                <img className="parallax-img" src={a.img} alt={L(a.name)} loading="lazy" />
              </Reveal>
              <Reveal variant={i % 2 ? 'left' : 'right'} className="exp-text">
                <div className="exp-num">{n(String(i + 1).padStart(2, '0'))}</div>
                <h3>{L(a.name)}</h3>
                <p>{L(a.desc)}</p>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 6 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '.88rem', fontWeight: 700, color: 'var(--forest)' }}>
                    <Icon name="pin" size={15} stroke={2} /> {n(a.km)} {t('explore.km')} {t('explore.away')}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '.88rem', fontWeight: 700, color: 'var(--gold)' }}>
                    <Icon name="clock" size={15} stroke={2} /> {n(a.mins)} {t('explore.minsUnit')} {t('explore.drive')}
                  </span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
