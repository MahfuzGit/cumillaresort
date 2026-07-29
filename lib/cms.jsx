'use client';
// Site content store (CMS): persisted in Supabase cms_settings (single row),
// with localStorage as a fast local cache. Falls back to DEFAULT_CMS if no
// Supabase project is configured yet.
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { IMG } from './data';
import { dict } from './dict';

const KEY = 'cumilla-cms-v1';

const pickHome = (k) => ({ en: dict.en.home[k], bn: dict.bn.home[k] });

export const DEFAULT_CMS = {
  hero: {
    img: IMG.heroHome,
    video: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/hero_video1.mp4',
    eyebrow: pickHome('heroEyebrow'),
    title1: pickHome('heroTitle1'),
    titleEm: pickHome('heroTitleEm'),
    title2: pickHome('heroTitle2'),
    sub: pickHome('heroSub'),
  },
  // Section 1: Our Sanctuary (About & Story)
  sanctuary: {
    eyebrow: { en: 'Our Sanctuary', bn: 'আমাদের স্যাঙ্কচুয়ারি' },
    title1: pickHome('aboutTitle1'),
    titleEm: pickHome('aboutTitleEm'),
    title2: pickHome('aboutTitle2'),
    lead: pickHome('aboutLead'),
    img1: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png',
    img2: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_pool.png',
  },
  // Section 2: Stay With Us (Villas Showcase)
  villasSec: {
    eyebrow: { en: 'Stay With Us', bn: 'আমাদের সাথে থাকুন' },
    title1: pickHome('villasTitle1'),
    titleEm: pickHome('villasTitleEm'),
    lead: pickHome('villasLead'),
  },
  // Section 3: Beyond the Room (Experiences Showcase)
  experiencesSec: {
    eyebrow: { en: 'Beyond the Room', bn: 'রুমের বাইরে' },
    title1: pickHome('expTitle1'),
    titleEm: pickHome('expTitleEm'),
  },
  // Section 4: The Gallery (Media Showcase)
  gallerySec: {
    eyebrow: { en: 'The Gallery', bn: 'গ্যালারি' },
    title1: pickHome('galleryTitle'),
    titleEm: pickHome('galleryTitleEm'),
    lead: pickHome('galleryLead'),
  },
  // Section 5: Guest Stories (Testimonials & Reviews)
  testimonialsSec: {
    eyebrow: { en: 'Guest Stories', bn: 'অতিথিদের গল্প' },
    title1: pickHome('testiTitle1'),
    titleEm: pickHome('testiTitleEm'),
    title2: pickHome('testiTitle2'),
  },
  // Section 6: Begin Your Journey (CTA Banner)
  ctaSec: {
    title: { en: 'Begin Your Journey', bn: 'আপনার যাত্রা শুরু করুন' },
    sub: { en: 'Reserve your villa today and experience eco-luxury in the Lalmai Hills.', bn: 'আজই ভিলা বুক করুন এবং লালমাই পাহাড়ে ইকো-লাক্সারি উপভোগ করুন।' },
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_couple_dining.png',
    video: '',
  },
  // Public menu visibility
  nav: {
    villas: true, experiences: true, dining: true,
    gallery: true, offers: true, about: true, contact: true, availability: true,
    events: true, explore: true, faq: true, myBooking: true,
  },
  // Homepage section visibility
  sections: {
    stats: true, about: true, villas: true, experiences: true,
    custom: true, gallery: true, testimonials: true, cta: true,
  },
  // Admin-added showcase sections (image + bilingual title/description)
  custom: [
    {
      id: 1,
      visible: true,
      img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png',
      title: { en: 'Monsoon at Cumilla Resort', bn: 'কুমিল্লা রিসোর্টে বর্ষা' },
      desc: {
        en: 'From July to September the hills turn impossibly green. Rain on the brick roof, hot local tea, and the Lalmai Hills steaming at dawn — monsoon is our secret season.',
        bn: 'জুলাই থেকে সেপ্টেম্বর — পুরো পাহাড় অঞ্চল অবিশ্বাস্য রকম সবুজ হয়ে ওঠে। টিনের বা ইটের ছাদে বৃষ্টির শব্দ, গরম চা, আর ভোরে কুয়াশায় ঢাকা লালমাই পাহাড় — বর্ষাই আমাদের গোপন ঋতু।',
      },
    },
  ],
};

// Deep-merge stored content over defaults so new fields never break old saves.
function mergeCms(stored) {
  if (!stored || typeof stored !== 'object') return DEFAULT_CMS;
  return {
    hero: { ...DEFAULT_CMS.hero, ...(stored.hero || {}) },
    sanctuary: { ...DEFAULT_CMS.sanctuary, ...(stored.sanctuary || {}) },
    villasSec: { ...DEFAULT_CMS.villasSec, ...(stored.villasSec || {}) },
    experiencesSec: { ...DEFAULT_CMS.experiencesSec, ...(stored.experiencesSec || {}) },
    gallerySec: { ...DEFAULT_CMS.gallerySec, ...(stored.gallerySec || {}) },
    testimonialsSec: { ...DEFAULT_CMS.testimonialsSec, ...(stored.testimonialsSec || {}) },
    ctaSec: { ...DEFAULT_CMS.ctaSec, ...(stored.ctaSec || {}) },
    nav: { ...DEFAULT_CMS.nav, ...(stored.nav || {}) },
    sections: { ...DEFAULT_CMS.sections, ...(stored.sections || {}) },
    custom: Array.isArray(stored.custom) ? stored.custom : DEFAULT_CMS.custom,
  };
}

// Convert flat Supabase row → CMS object shape
function rowToCms(row) {
  if (!row) return null;
  if (row.full_data && typeof row.full_data === 'object' && row.full_data.hero) {
    return mergeCms(row.full_data);
  }
  return mergeCms({
    hero: {
      img: row.hero_img,
      video: row.hero_video,
      eyebrow: row.hero_eyebrow,
      title1: row.hero_title1,
      titleEm: row.hero_title_em,
      title2: row.hero_title2,
      sub: row.hero_sub,
    },
    sanctuary: row.sanctuary_json,
    villasSec: row.villas_sec_json,
    experiencesSec: row.exp_sec_json,
    gallerySec: row.gallery_sec_json,
    testimonialsSec: row.testimonials_sec_json,
    ctaSec: row.cta_sec_json,
    nav: row.nav_json,
    sections: row.sections_json,
    custom: row.custom_json,
  });
}

// Convert CMS object → flat Supabase row shape
function cmsToRow(cms) {
  return {
    id: 1,
    hero_img: cms.hero.img,
    hero_video: cms.hero.video,
    hero_eyebrow: cms.hero.eyebrow,
    hero_title1: cms.hero.title1,
    hero_title_em: cms.hero.titleEm,
    hero_title2: cms.hero.title2,
    hero_sub: cms.hero.sub,
    sanctuary_json: cms.sanctuary,
    villas_sec_json: cms.villasSec,
    exp_sec_json: cms.experiencesSec,
    gallery_sec_json: cms.gallerySec,
    testimonials_sec_json: cms.testimonialsSec,
    cta_sec_json: cms.ctaSec,
    nav_json: cms.nav,
    sections_json: cms.sections,
    custom_json: cms.custom,
    full_data: cms,
    updated_at: new Date().toISOString(),
  };
}

const CmsCtx = createContext(null);

export function CmsProvider({ children }) {
  const [cms, setCms] = useState(DEFAULT_CMS);

  // Load on mount: try Neon/API first, fall back to localStorage, then defaults.
  useEffect(() => {
    async function load() {
      // 1. Instant paint from localStorage cache
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) setCms(mergeCms(JSON.parse(raw)));
      } catch { /* corrupted — ignore */ }

      // 2. Fetch authoritative data from Neon/API
      try {
        const res = await fetch('/api/cms');
        if (res.ok) {
          const data = await res.json();
          if (data) {
            const fresh = rowToCms(data);
            setCms(fresh);
            try { localStorage.setItem(KEY, JSON.stringify(fresh)); } catch { /* storage full */ }
          }
        }
      } catch { /* fetch failed — use cached value */ }
    }
    load();

    // Cross-tab sync via localStorage
    const onStorage = (e) => {
      if (e.key !== KEY) return;
      try { setCms(mergeCms(JSON.parse(e.newValue))); } catch { /* ignore */ }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Persist: update local state + localStorage + Neon/API
  const apply = useCallback((fn) => {
    setCms((prev) => {
      const next = fn(prev);
      // Sync localStorage immediately for instant cross-component reactivity
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* full */ }
      // Async-persist to Neon/API (fire and forget — non-blocking)
      fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmsToRow(next)),
      })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          console.warn('[CMS] Persist failed:', err.message || res.statusText);
        }
      })
      .catch((err) => {
        console.warn('[CMS] Persist failed:', err);
      });
      return next;
    });
  }, []);

  const setHeroField = useCallback((field, lng, value) => {
    apply((p) => ({ ...p, hero: { ...p.hero, [field]: { ...p.hero[field], [lng]: value } } }));
  }, [apply]);

  const setHeroImg = useCallback((url) => {
    apply((p) => ({ ...p, hero: { ...p.hero, img: url } }));
  }, [apply]);

  const setHeroVideo = useCallback((url) => {
    apply((p) => ({ ...p, hero: { ...p.hero, video: url } }));
  }, [apply]);

  const setSectionField = useCallback((secKey, field, lng, value) => {
    apply((p) => ({
      ...p,
      [secKey]: {
        ...p[secKey],
        [field]: { ...p[secKey]?.[field], [lng]: value }
      }
    }));
  }, [apply]);

  const setSectionImage = useCallback((secKey, imgField, url) => {
    apply((p) => ({
      ...p,
      [secKey]: {
        ...p[secKey],
        [imgField]: url
      }
    }));
  }, [apply]);

  const toggleNav = useCallback((key) => {
    apply((p) => ({ ...p, nav: { ...p.nav, [key]: !p.nav[key] } }));
  }, [apply]);

  const toggleSection = useCallback((key) => {
    apply((p) => ({ ...p, sections: { ...p.sections, [key]: !p.sections[key] } }));
  }, [apply]);

  const addCustom = useCallback((blank) => {
    apply((p) => {
      const id = p.custom.reduce((m, c) => Math.max(m, c.id), 0) + 1;
      return { ...p, custom: [...p.custom, { id, visible: true, ...blank }] };
    });
  }, [apply]);

  const updateCustom = useCallback((id, patch) => {
    apply((p) => ({ ...p, custom: p.custom.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
  }, [apply]);

  const removeCustom = useCallback((id) => {
    apply((p) => ({ ...p, custom: p.custom.filter((c) => c.id !== id) }));
  }, [apply]);

  const reset = useCallback(async () => {
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
    setCms(DEFAULT_CMS);
    try {
      await fetch('/api/cms', { method: 'DELETE' });
    } catch { /* ignore */ }
  }, []);

  return (
    <CmsCtx.Provider value={{
      cms,
      setHeroField,
      setHeroImg,
      setHeroVideo,
      setSectionField,
      setSectionImage,
      toggleNav,
      toggleSection,
      addCustom,
      updateCustom,
      removeCustom,
      reset
    }}>
      {children}
    </CmsCtx.Provider>
  );
}

export function useCms() {
  const ctx = useContext(CmsCtx);
  if (!ctx) throw new Error('useCms must be used inside CmsProvider');
  return ctx;
}


