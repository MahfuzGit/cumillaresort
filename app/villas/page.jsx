'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import VillaCard from '../../components/VillaCard';
import { useLang } from '../../lib/i18n';
import { villas, IMG } from '../../lib/data';

export default function VillasPage() {
  const { t } = useLang();
  return (
    <>
      <Navbar />
      <PageHero title={t('villas.pageTitle')} subtitle={t('villas.pageSub')} image={IMG.heroVillas} />
      <section>
        <div className="container">
          <div className="card-grid">
            {villas.map((v, i) => <VillaCard key={v.slug} villa={v} delay={(i % 3) + 1} />)}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
