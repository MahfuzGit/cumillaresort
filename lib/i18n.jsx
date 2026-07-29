'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { dict } from './dict';

const LangCtx = createContext(null);

const BN_DIGITS = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };

export function toBn(str) {
  return String(str).replace(/[0-9]/g, (d) => BN_DIGITS[d]);
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('cumilla-lang');
    if (saved === 'bn' || saved === 'en') setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem('cumilla-lang', l); } catch {}
  }, []);

  // t('home.hero.title') -> translated string
  const t = useCallback((path) => {
    const parts = path.split('.');
    let node = dict[lang];
    for (const p of parts) {
      if (node == null) break;
      node = node[p];
    }
    if (node == null) {
      // fallback to English
      node = dict.en;
      for (const p of parts) {
        if (node == null) break;
        node = node[p];
      }
    }
    return node ?? path;
  }, [lang]);

  // n(1234) -> "1,234" or "১,২৩৪"
  const n = useCallback((value) => {
    const s = typeof value === 'number' ? value.toLocaleString('en-US') : String(value);
    return lang === 'bn' ? toBn(s) : s;
  }, [lang]);

  // L({en,bn}) -> localized field from data objects
  const L = useCallback((obj) => {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] ?? obj.en ?? '';
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang, t, n, L }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
