'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { restaurants, IMG } from '../../lib/data';

export default function DiningPage() {
  const { t, L } = useLang();
  const router = useRouter();
  return (
    <>
      <Navbar />
      <PageHero title={t('dining.pageTitle')} subtitle={t('dining.pageSub')} image={IMG.heroDining} />
      <section>
        <div className="container">
          {restaurants.map((r, i) => (
            <div key={i} className={`exp-row${i % 2 ? ' flip' : ''}`}>
              <Reveal variant={i % 2 ? 'right' : 'left'} className="exp-media">
                <img className="parallax-img" src={r.img} alt={L(r.name)} loading="lazy" style={{ position: 'absolute', inset: 0, height: '100%' }} />
              </Reveal>
              <Reveal variant={i % 2 ? 'left' : 'right'} className="exp-text">
                <h3>{L(r.name)}</h3>
                <div className="exp-chips">
                  <span className="chip"><Icon name="dining" size={14} />{L(r.cuisine)}</span>
                  <span className="chip"><Icon name="clock" size={14} />{L(r.hours)}</span>
                </div>
                <p>{L(r.desc)}</p>
                <div style={{ marginBottom: 22 }}>
                  <strong style={{ fontSize: '.8rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    {t('dining.signature')}
                  </strong>
                  <div className="amenity-chips" style={{ marginTop: 10 }}>
                    {r.dishes.map((d, j) => (
                      <span key={j}><Icon name="star" size={13} />{L(d)}</span>
                    ))}
                  </div>
                </div>
                <button className="text-link" onClick={() => router.push('/contact')}>
                  {t('dining.reserveTable')} <Icon name="arrowRight" size={15} stroke={2.2} />
                </button>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
