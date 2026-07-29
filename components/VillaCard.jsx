'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '../lib/i18n';
import { fmtTaka, getVillaImage } from '../lib/data';
import Icon from './Icons';
import Reveal from './Reveal';

export default function VillaCard({ villa, delay = 0 }) {
  const { t, n, L } = useLang();
  const [imgSrc, setImgSrc] = useState(villa.img);

  useEffect(() => {
    setImgSrc(getVillaImage(villa.slug, villa.img));
    const onStorage = () => setImgSrc(getVillaImage(villa.slug, villa.img));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [villa.slug, villa.img]);

  return (
    <Reveal as="article" delay={delay} className="v-card">
      <Link href={`/villas/${villa.slug}`}>
        <div className="v-media">
          <img
            src={imgSrc}
            alt={L(villa.name)}
            loading="lazy"
            onError={() => setImgSrc(villa.img)}
          />
          <span className="v-tag">{L(villa.tag)}</span>
        </div>

        <div className="v-body">
          <h3>{L(villa.name)}</h3>
          <div className="v-meta">
            <span><Icon name="users" size={15} />{n(villa.guests)} {t('common.guests')}</span>
            <span><Icon name="bed" size={15} />{L(villa.beds)}</span>
            <span><Icon name="area" size={15} />{n(villa.size)} m²</span>
          </div>
          <div className="v-foot">
            <div className="price">
              {fmtTaka(villa.price, n)} <small>{t('common.perNight')}</small>
            </div>
            <span className="text-link">
              {t('common.viewDetails')} <Icon name="arrowRight" size={14} stroke={2.2} />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

