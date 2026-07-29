'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { offers, fmtTaka, IMG } from '../../lib/data';

export default function OffersPage() {
  const { t, n, L } = useLang();
  const router = useRouter();
  return (
    <>
      <Navbar />
      <PageHero title={t('offers.pageTitle')} subtitle={t('offers.pageSub')} image={IMG.heroOffers} />
      <section>
        <div className="container">
          <div className="card-grid two">
            {offers.map((o, i) => (
              <Reveal key={i} delay={(i % 2) + 1} as="article" className="v-card">
                <div className="v-media">
                  <img src={o.img} alt={L(o.name)} loading="lazy" />
                  <span className="v-tag" style={{ background: 'var(--gold)', color: '#fff' }}>
                    −{n(o.save)}%
                  </span>
                </div>
                <div className="v-body">
                  <h3>{L(o.name)}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '.95rem', margin: '10px 0 16px' }}>{L(o.desc)}</p>
                  <div className="v-meta">
                    <span><Icon name="calendar" size={16} />{t('offers.validTill')}: {L(o.till)}</span>
                  </div>
                  <div className="v-foot">
                    <div className="price">
                      {fmtTaka(o.price, n)} <small>{t(`offers.${o.unit}`)}</small>
                    </div>
                    <button className="text-link" onClick={() => router.push('/booking')}>
                      {t('offers.bookOffer')} <Icon name="arrowRight" size={15} stroke={2.2} />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
