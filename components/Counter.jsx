'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '../lib/i18n';

// Animated count-up number, localized to Bangla numerals when lang === 'bn'.
export default function Counter({ target }) {
  const ref = useRef(null);
  const { n, lang } = useLang();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          if (reduce) {
            el.textContent = n(target);
            return;
          }
          const t0 = performance.now();
          const dur = 1600;
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            el.textContent = n(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, n, lang]);

  return <span ref={ref}>{n(0)}</span>;
}
