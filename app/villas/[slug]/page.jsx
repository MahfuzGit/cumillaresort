'use client';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Reveal from '../../../components/Reveal';
import VillaCard from '../../../components/VillaCard';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { villas, fmtTaka } from '../../../lib/data';

export default function VillaDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const { t, n, L } = useLang();
  const villa = villas.find((v) => v.slug === slug) ?? villas[0];
  const others = villas.filter((v) => v.slug !== villa.slug).slice(0, 3);

  return (
    <>
      <Navbar solid />
      <section style={{ paddingTop: 140 }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">{t('villas.pageTitle')}</span>
            <h1 className="sec serif" style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)', color: 'var(--forest)', marginBottom: 10 }}>
              {L(villa.name)}
            </h1>
            <div className="v-meta" style={{ marginBottom: 34 }}>
              <span><Icon name="users" size={16} />{n(villa.guests)} {t('common.guests')}</span>
              <span><Icon name="bed" size={16} />{L(villa.beds)}</span>
              <span><Icon name="area" size={16} />{n(villa.size)} m²</span>
            </div>
          </Reveal>

          <Reveal variant="zoom" className="detail-gallery" style={{ marginBottom: 48 }}>
            <img src={villa.img} alt={L(villa.name)} />
            <img src={villa.img2} alt="" loading="lazy" />
            <img src={villa.img3} alt="" loading="lazy" />
          </Reveal>

          <div className="detail-grid">
            <Reveal variant="left">
              <h2 className="sec" style={{ fontSize: '1.6rem' }}>{t('villas.overview')}</h2>
              <p className="lead" style={{ maxWidth: 'none' }}>{L(villa.desc)}</p>
              <h2 className="sec" style={{ fontSize: '1.6rem', marginTop: 36 }}>{t('villas.amenities')}</h2>
              <div className="amenity-chips">
                {villa.amenities.map((a, i) => (
                  <span key={i}><Icon name="check" size={15} stroke={2.4} />{L(a)}</span>
                ))}
              </div>
            </Reveal>
            <Reveal variant="right" className="sticky-book">
              <div style={{ fontSize: '.8rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {t('villas.priceFrom')}
              </div>
              <div className="price" style={{ margin: '6px 0 4px' }}>
                {fmtTaka(villa.price, n)} <small>{t('common.perNight')}</small>
              </div>
              <h3 style={{ fontSize: '1rem', color: 'var(--forest)', margin: '18px 0 4px' }}>{t('villas.whatsIncluded')}</h3>
              <ul className="included-list">
                {t('villas.included').map((item, i) => (
                  <li key={i}><Icon name="check" size={17} stroke={2.4} />{item}</li>
                ))}
              </ul>
              <button className="btn btn-gold" style={{ width: '100%' }} onClick={() => router.push(`/booking?villa=${villa.slug}`)}>
                {t('villas.checkDates')}
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <Reveal>
            <h2 className="sec" style={{ fontSize: '1.9rem', marginBottom: 40 }}>{t('villas.otherVillas')}</h2>
          </Reveal>
          <div className="card-grid">
            {others.map((v, i) => <VillaCard key={v.slug} villa={v} delay={i + 1} />)}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
