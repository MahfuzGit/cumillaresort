'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { experiences, fmtTaka, IMG } from '../../lib/data';

export default function ExperiencesPage() {
  const { t, n, L } = useLang();
  const router = useRouter();
  return (
    <>
      <Navbar />
      <PageHero title={t('experiences.pageTitle')} subtitle={t('experiences.pageSub')} image={IMG.heroExp} />
      <section>
        <div className="container">
          {experiences.map((exp, i) => (
            <div key={i} className={`exp-row${i % 2 ? ' flip' : ''}`}>
              <Reveal variant={i % 2 ? 'right' : 'left'} className="exp-media">
                <img className="parallax-img" src={exp.img} alt={L(exp.name)} loading="lazy" style={{ position: 'absolute', inset: 0, height: '100%' }} />
              </Reveal>
              <Reveal variant={i % 2 ? 'left' : 'right'} className="exp-text">
                <div className="exp-num">{n(String(i + 1).padStart(2, '0'))}</div>
                <h3>{L(exp.name)}</h3>
                <div className="exp-chips">
                  <span className="chip"><Icon name="clock" size={14} />{L(exp.duration)}</span>
                  <span className="chip"><Icon name={exp.icon} size={14} />{t(`experiences.${exp.level}`)}</span>
                  <span className="chip"><Icon name="taka" size={14} />{fmtTaka(exp.price, n)}</span>
                </div>
                <p>{L(exp.desc)}</p>
                <button className="text-link" onClick={() => router.push('/booking')}>
                  {t('experiences.bookExp')} <Icon name="arrowRight" size={15} stroke={2.2} />
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
