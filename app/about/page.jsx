'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { team, IMG } from '../../lib/data';

const VALUE_ICONS = ['shield', 'users', 'dining', 'heart'];

export default function AboutPage() {
  const { t, L } = useLang();
  return (
    <>
      <Navbar />
      <PageHero title={t('about.pageTitle')} subtitle={t('about.pageSub')} image={IMG.heroAbout} />

      {/* Story */}
      <section>
        <div className="container about-grid">
          <Reveal variant="left">
            <span className="eyebrow">{t('about.storyEyebrow')}</span>
            <h2 className="sec">
              {t('about.storyTitle1')} <em>{t('about.storyTitleEm')}</em>
            </h2>
            <p className="lead" style={{ marginBottom: 18 }}>{t('about.story1')}</p>
            <p className="lead">{t('about.story2')}</p>
          </Reveal>
          <Reveal variant="right" className="collage" style={{ height: 480 }}>
            <img className="c1" src={IMG.heroHome} alt="Tea garden rows at Sreemangal" loading="lazy" />
            <img className="c2" src={IMG.collage1} alt="Lawachara forest light" loading="lazy" />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <Reveal className="center" style={{ marginBottom: 52 }}>
            <h2 className="sec">{t('about.valuesTitle')}</h2>
          </Reveal>
          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {t('about.values').map((v, i) => (
              <Reveal key={i} delay={i + 1} className="quote-card" style={{ textAlign: 'center', alignItems: 'center' }}>
                <div className="ico" style={{ width: 54, height: 54, borderRadius: 16, background: 'rgba(201,162,39,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', margin: '0 auto' }}>
                  <Icon name={VALUE_ICONS[i]} size={26} />
                </div>
                <h3 style={{ color: 'var(--forest)', fontSize: '1.15rem' }}>{v.t}</h3>
                <p style={{ fontStyle: 'normal', fontSize: '.92rem', color: 'var(--muted)' }}>{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section>
        <div className="container">
          <Reveal className="center" style={{ marginBottom: 52 }}>
            <h2 className="sec">{t('about.teamTitle')}</h2>
          </Reveal>
          <div className="staff-grid">
            {team.map((m, i) => (
              <Reveal key={i} delay={i + 1} className="staff-card">
                <img src={m.img} alt={L(m.name)} loading="lazy" />
                <h3>{L(m.name)}</h3>
                <div className="role">{L(m.role)}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section style={{ background: 'var(--forest)', color: '#fff' }}>
        <div className="container center">
          <Reveal>
            <h2 className="sec" style={{ color: '#fff' }}>{t('about.awardsTitle')}</h2>
          </Reveal>
          <div style={{ display: 'grid', gap: 18, maxWidth: 620, margin: '40px auto 0' }}>
            {t('about.awards').map((a, i) => (
              <Reveal key={i} delay={i + 1} style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'center', color: 'var(--sage)' }}>
                <Icon name="award" size={22} className="" />
                <span style={{ fontSize: '1.02rem' }}>{a}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
