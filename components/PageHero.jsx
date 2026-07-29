'use client';
import { useEffect, useRef } from 'react';

// Small parallax hero banner for subpages.
export default function PageHero({ title, subtitle, image }) {
  const bgRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (bgRef.current && window.scrollY < window.innerHeight) {
          bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="page-hero">
      <div className="bg" ref={bgRef} style={{ backgroundImage: `url('${image}')` }} />
      <div className="inner">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}
