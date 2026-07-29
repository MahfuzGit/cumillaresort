'use client';
import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal wrapper component.
 *
 * variant: '' (up) | 'left' | 'right' | 'zoom' | 'blur' | 'clip' | 'scale'
 * delay:   0–4  (stagger steps, maps to CSS transition-delay)
 */
export default function Reveal({
  children,
  variant = '',
  delay = 0,
  className = '',
  as: Tag = 'div',
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = ['reveal', variant, delay ? `d${delay}` : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag ref={ref} className={cls} style={style}>
      {children}
    </Tag>
  );
}
