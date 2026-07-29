'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import VillaCard from '../components/VillaCard';
import Icon, { StarRow } from '../components/Icons';
import { useLang } from '../lib/i18n';
import { useCms } from '../lib/cms';
import { villas, experiences, galleryImages, IMG } from '../lib/data';

export default function Home() {
  const { t, n, L, lang } = useLang();
  const { cms } = useCms();
  const heroRef     = useRef(null);
  const videoRef    = useRef(null);
  const ctaVideoRef = useRef(null);
  const router      = useRouter();
  const sec = cms.sections;
  const customSections = cms.custom.filter((c) => c.visible);

  // ── Hero Image → Video → Image loop ───────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.style.opacity = '1';
      video.play().catch(() => {});
      return;
    }

    let timer = null;
    const fadeVideoIn = () => {
      video.currentTime = 0;
      video.style.opacity = '1';
      video.play().catch(() => {});
    };
    const fadeVideoOut = () => {
      video.style.opacity = '0';
    };
    const onEnded = () => {
      fadeVideoOut();
      timer = setTimeout(fadeVideoIn, 5500);
    };

    video.addEventListener('ended', onEnded);
    timer = setTimeout(fadeVideoIn, 4500);

    return () => {
      clearTimeout(timer);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  // ── CTA Image → Video → Image loop ────────────────────────────────
  useEffect(() => {
    const video = ctaVideoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.style.opacity = '1';
      video.play().catch(() => {});
      return;
    }

    let timer = null;
    const fadeVideoIn = () => {
      video.currentTime = 0;
      video.style.opacity = '1';
      video.play().catch(() => {});
    };
    const fadeVideoOut = () => {
      video.style.opacity = '0';
    };
    const onEnded = () => {
      fadeVideoOut();
      timer = setTimeout(fadeVideoIn, 5500);
    };

    video.addEventListener('ended', onEnded);
    timer = setTimeout(fadeVideoIn, 4500);

    return () => {
      clearTimeout(timer);
      video.removeEventListener('ended', onEnded);
    };
  }, [cms.ctaSec.video]);


  // ── Parallax: hero + experience images ──────────────────────
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        // Hero parallax (slow, gentle)
        if (heroRef.current && y < window.innerHeight) {
          heroRef.current.style.transform = `translateY(${y * 0.32}px)`;
        }
        // Experience image parallax
        const vh = window.innerHeight;
        document.querySelectorAll('.parallax-img').forEach((img) => {
          const r = img.parentElement.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          const progress = (r.top + r.height / 2 - vh / 2) / vh;
          img.style.transform = `translateY(${progress * -38}px)`;
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const marqueeA = galleryImages.slice(0, 5);
  const marqueeB = galleryImages.slice(5, 10);
  const testimonials = [0, 1, 2];

  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <header className="hero">
        {/* Static image — shown first */}
        <div
          className="hero-bg"
          ref={heroRef}
          style={{ backgroundImage: `url('${cms.hero.img}')` }}
        />
        {/* Video — JS controls fade-in/out; no loop attr so 'ended' fires */}
        <video
          ref={videoRef}
          className="hero-video"
          src={cms.hero.video || 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/hero_video1.mp4'}
          autoPlay
          muted
          playsInline
          preload="auto"
        />

        <div className="hero-content">
          <h1>
            {L(cms.hero.title1)} <em>{L(cms.hero.titleEm)}</em>
            <br />
            {L(cms.hero.title2)}
          </h1>
          <p>{L(cms.hero.sub)}</p>
          <div className="hero-actions">
            <button className="btn btn-gold" onClick={() => router.push('/booking')}>
              {t('home.reserveEscape')}
            </button>
            <button className="btn btn-ghost" onClick={() => router.push('/villas')}>
              {t('home.exploreVillas')}
            </button>
          </div>
        </div>
        <div className="scroll-hint">
          {t('common.scroll')}
          <span className="line" />
        </div>
      </header>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      {sec.stats && (
        <div className="stats">
          <div className="container">
            <Reveal className="stat-item">
              <div className="stat-num"><Counter target={32} /></div>
              <div className="stat-label">{t('home.stats.villas')}</div>
            </Reveal>
            <Reveal delay={1} className="stat-item">
              <div className="stat-num"><Counter target={120} /></div>
              <div className="stat-label">{t('home.stats.acres')}</div>
            </Reveal>
            <Reveal delay={2} className="stat-item">
              <div className="stat-num"><Counter target={14} /></div>
              <div className="stat-label">{t('home.stats.years')}</div>
            </Reveal>
            <Reveal delay={3} className="stat-item">
              <div className="stat-num"><Counter target={96} /></div>
              <div className="stat-label">{t('home.stats.rate')}</div>
            </Reveal>
          </div>
        </div>
      )}

      {/* ── ABOUT / OUR SANCTUARY ───────────────────────────── */}
      {sec.about && (
        <section id="about">
          <div className="container about-grid">
            <Reveal variant="left" className="collage">
              <img
                className="c1"
                src={cms.sanctuary.img1 || IMG.collage1}
                alt="Sunlight through rainforest trees near Kotbari"
                loading="lazy"
              />
              <img
                className="c2"
                src={cms.sanctuary.img2 || IMG.collage2}
                alt="Resort pool at the edge of the gardens"
                loading="lazy"
              />
              <div className="badge-award">
                <Icon name="award" size={30} stroke={1.6} />
                <div>
                  <strong>{t('home.award')}</strong>
                  <span>{t('home.awardSub')}</span>
                </div>
              </div>
            </Reveal>

            <Reveal variant="right">
              <span className="eyebrow">{L(cms.sanctuary.eyebrow)}</span>
              <h2 className="sec">
                {L(cms.sanctuary.title1)} <em>{L(cms.sanctuary.titleEm)}</em> {L(cms.sanctuary.title2)}
              </h2>
              <p className="lead">{L(cms.sanctuary.lead)}</p>
              <div className="feature-list">
                {[
                  { icon: 'sun',    tk: 'home.f1t', dk: 'home.f1d' },
                  { icon: 'dining', tk: 'home.f2t', dk: 'home.f2d' },
                ].map((f, i) => (
                  <Reveal key={f.icon} delay={i + 1} className="feature-item">
                    <div className="ico"><Icon name={f.icon} size={22} /></div>
                    <div>
                      <h3>{t(f.tk)}</h3>
                      <p>{t(f.dk)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── STAY WITH US (VILLAS PREVIEW) ────────────────────── */}
      {sec.villas && (
        <section style={{ background: 'var(--ivory-2)' }}>
          <div className="container">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 24,
                flexWrap: 'wrap',
                marginBottom: 56,
              }}
            >
              <Reveal>
                <span className="eyebrow">{L(cms.villasSec.eyebrow)}</span>
                <h2 className="sec" style={{ marginBottom: 0 }}>
                  {L(cms.villasSec.title1)} <em>{L(cms.villasSec.titleEm)}</em>
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="lead">{L(cms.villasSec.lead)}</p>
              </Reveal>
            </div>

            <div className="card-grid">
              {villas.slice(0, 3).map((v, i) => (
                <VillaCard key={v.slug} villa={v} delay={i + 1} />
              ))}
            </div>

            <Reveal className="center" style={{ marginTop: 52 }}>
              <Link href="/villas" className="btn btn-outline">
                {t('common.viewAll')}
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── BEYOND THE ROOM (EXPERIENCES) ────────────────────── */}
      {sec.experiences && (
        <section>
          <div className="container">
            <Reveal variant="blur" className="center" style={{ marginBottom: 80 }}>
              <span className="eyebrow center">{L(cms.experiencesSec.eyebrow)}</span>
              <h2 className="sec">
                {L(cms.experiencesSec.title1)} <em>{L(cms.experiencesSec.titleEm)}</em>
              </h2>
            </Reveal>

            {experiences.slice(0, 3).map((exp, i) => (
              <div key={i} className={`exp-row${i % 2 ? ' flip' : ''}`}>
                <Reveal variant={i % 2 ? 'right' : 'left'} className="exp-media">
                  <img className="parallax-img" src={exp.img} alt={L(exp.name)} loading="lazy" />
                </Reveal>
                <Reveal variant={i % 2 ? 'left' : 'right'} className="exp-text">
                  <div className="exp-num">{n(String(i + 1).padStart(2, '0'))}</div>
                  <h3>{L(exp.name)}</h3>
                  <p>{L(exp.desc)}</p>
                  <Link className="text-link" href="/experiences">
                    {t('common.learnMore')} <Icon name="arrowRight" size={14} stroke={2.2} />
                  </Link>
                </Reveal>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CUSTOM CMS SECTIONS ──────────────────────────────── */}
      {sec.custom && customSections.length > 0 && (
        <section style={{ background: 'var(--ivory-2)' }}>
          <div className="container">
            {customSections.map((c, i) => (
              <div key={c.id} className={`exp-row${i % 2 ? ' flip' : ''}`}>
                <Reveal variant={i % 2 ? 'right' : 'left'} className="exp-media">
                  <img className="parallax-img" src={c.img} alt={L(c.title)} loading="lazy" />
                </Reveal>
                <Reveal variant={i % 2 ? 'left' : 'right'} className="exp-text">
                  <h3>{L(c.title)}</h3>
                  <p>{L(c.desc)}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── THE GALLERY ──────────────────────────────────────── */}
      {sec.gallery && (
        <section className="gallery-band" style={{ padding: '108px 0' }}>
          <Reveal variant="blur" className="head">
            <span className="eyebrow center">{L(cms.gallerySec.eyebrow)}</span>
            <h2 className="sec" style={{ color: '#fff' }}>
              {L(cms.gallerySec.title1)} <em>{L(cms.gallerySec.titleEm)}</em>
            </h2>
            <p className="lead">{L(cms.gallerySec.lead)}</p>
          </Reveal>

          <div className="marquee" aria-hidden="true">
            {[0, 1].map((k) => (
              <div className="marquee-track" key={k}>
                {marqueeA.map((g, i) => <img key={i} src={g.src} alt="" />)}
              </div>
            ))}
          </div>
          <div className="marquee reverse" aria-hidden="true">
            {[0, 1].map((k) => (
              <div className="marquee-track" key={k}>
                {marqueeB.map((g, i) => <img key={i} src={g.src} alt="" />)}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── GUEST STORIES (TESTIMONIALS) ─────────────────────── */}
      {sec.testimonials && (
        <section>
          <div className="container">
            <Reveal variant="blur" className="center">
              <span className="eyebrow center">{L(cms.testimonialsSec.eyebrow)}</span>
              <h2 className="sec">
                {L(cms.testimonialsSec.title1)} <em>{L(cms.testimonialsSec.titleEm)}</em> {L(cms.testimonialsSec.title2)}
              </h2>
            </Reveal>

            <div className="quote-grid">
              {testimonials.map((idx) => {
                const item = t('testimonials')[idx];
                const avatars = [47, 12, 32];
                return (
                  <Reveal key={idx} delay={idx + 1} className="quote-card">
                    <StarRow />
                    <p>{item.quote}</p>
                    <div className="quote-who">
                      <img
                        src={`https://i.pravatar.cc/96?img=${avatars[idx]}`}
                        alt={item.name}
                        loading="lazy"
                      />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.where}</span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── BEGIN YOUR JOURNEY (CTA) ─────────────────────────── */}
      {sec.cta && (
        <section className="cta-band">
          {/* Static background image — shown first */}
          <div
            className="cta-bg"
            style={{ backgroundImage: `url('${cms.ctaSec.img || IMG.cta}')` }}
          />

          {/* Background video — JS drives smooth fade in / fade out alternating loop */}
          {cms.ctaSec.video && (
            <video
              ref={ctaVideoRef}
              className="cta-video"
              src={cms.ctaSec.video}
              autoPlay
              muted
              playsInline
              preload="auto"
            />
          )}

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <Reveal variant="blur">
              <span
                className="eyebrow center"
                style={{ color: 'var(--champagne-2)' }}
              >
                {t('home.ctaEyebrow')}
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="sec">
                {t('home.ctaTitle1')} <em>{t('home.ctaTitleEm')}</em>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="lead">{t('home.ctaLead')}</p>
            </Reveal>
            <Reveal delay={3}>
              <form
                className="booking-bar"
                onSubmit={(e) => {
                  e.preventDefault();
                  const inV  = document.getElementById('h-in')?.value  || '';
                  const outV = document.getElementById('h-out')?.value || '';
                  router.push(`/availability?in=${inV}&out=${outV}`);
                }}
              >
                <div className="booking-field">
                  <label htmlFor="h-in">{t('common.checkIn')}</label>
                  <input id="h-in" type="date" defaultValue="2026-07-12" />
                </div>
                <div className="booking-field">
                  <label htmlFor="h-out">{t('common.checkOut')}</label>
                  <input id="h-out" type="date" defaultValue="2026-07-15" />
                </div>
                <div className="booking-field">
                  <label htmlFor="h-guests">{t('common.guests')}</label>
                  <select id="h-guests">
                    <option>{n(2)} {t('common.adults')}</option>
                    <option>{n(2)} {t('common.adults')}, {n(1)} {t('common.children')}</option>
                    <option>{n(4)} {t('common.adults')}</option>
                  </select>
                </div>
                <div className="booking-field">
                  <label htmlFor="h-villa">{t('common.villaType')}</label>
                  <select id="h-villa">
                    <option>{t('common.anyVilla')}</option>
                    {villas.map((v) => <option key={v.slug}>{L(v.name)}</option>)}
                  </select>
                </div>
                <button className="btn btn-gold" type="submit">
                  {t('common.checkAvailability')}
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
