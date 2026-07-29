'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLang } from '../lib/i18n';
import { useCms } from '../lib/cms';
import LangToggle from './LangToggle';
import Icon from './Icons';

const LINKS = [
  { href: '/', key: 'home' },
  { href: '/villas', key: 'villas' },
  { href: '/experiences', key: 'experiences' },
  { href: '/dining', key: 'dining' },
  { href: '/gallery', key: 'gallery' },
  { href: '/features', key: 'features' },
  { href: '/availability', key: 'availability' },
  { href: '/events', key: 'events' },
  { href: '/explore', key: 'explore' },
  { href: '/offers', key: 'offers' },
  { href: '/about', key: 'about' },
  { href: '/faq', key: 'faq' },
  { href: '/contact', key: 'contact' },
  { href: '/my-booking', key: 'myBooking' },
];

// solid: subpages render the navbar on light backgrounds from the start
export default function Navbar({ solid = false }) {
  const { t } = useLang();
  const { cms } = useCms();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Menu visibility is controlled from the admin CMS page
  const visible = LINKS.filter((l) => l.key === 'home' || cms.nav[l.key] !== false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}${solid ? ' solid' : ''}`} aria-label="Main navigation">
        <Link className="nav-logo" href="/" aria-label="Cumilla Resort home">
          <Icon name="leaf" size={28} stroke={1.6} />
          {t('brand.name')}
        </Link>
        <div className="nav-links">
          {visible.slice(1, 8).map((l) => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
              {t(`nav.${l.key}`)}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LangToggle />
          <button className="nav-cta" onClick={() => router.push('/booking')}>
            {t('nav.bookNow')}
          </button>
          <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
            <Icon name="menu" size={26} stroke={2} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <button className="close" onClick={() => setOpen(false)} aria-label="Close menu">
          <Icon name="close" size={30} stroke={2} />
        </button>
        {visible.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {t(`nav.${l.key}`)}
          </Link>
        ))}
        <Link href="/booking" onClick={() => setOpen(false)} style={{ color: 'var(--gold-soft)' }}>
          {t('nav.bookNow')}
        </Link>
        <Link href="/admin/login" onClick={() => setOpen(false)} style={{ fontSize: '1.05rem', opacity: 0.7 }}>
          {t('nav.management')}
        </Link>
      </div>
    </>
  );
}
