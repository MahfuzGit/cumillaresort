'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import { useLang } from '../../lib/i18n';
import { galleryImages, IMG } from '../../lib/data';

const CATS = ['all', 'nature', 'villas', 'dining'];

export default function GalleryPage() {
  const { t } = useLang();
  const [cat, setCat] = useState('all');
  const shown = cat === 'all' ? galleryImages : galleryImages.filter((g) => g.cat === cat);

  return (
    <>
      <Navbar />
      <PageHero title={t('gallery.pageTitle')} subtitle={t('gallery.pageSub')} image={IMG.heroGallery} />
      <section>
        <div className="container">
          <Reveal className="filter-chips">
            {CATS.map((c) => (
              <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>
                {t(`gallery.${c}`)}
              </button>
            ))}
          </Reveal>
          <div className="masonry" key={cat}>
            {shown.map((g, i) => (
              <img key={g.src + i} src={g.src} alt={`${t(`gallery.${g.cat}`)} photo`} loading="lazy"
                style={{ animation: `fadeUp .7s ${i * 0.06}s cubic-bezier(.22,.61,.36,1) backwards` }} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
