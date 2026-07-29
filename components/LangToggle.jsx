'use client';
import { useLang } from '../lib/i18n';

export default function LangToggle({ dark = false }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`lang-toggle${dark ? ' dark' : ''}`} role="group" aria-label="Language">
      <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>
        EN
      </button>
      <button className={lang === 'bn' ? 'on' : ''} onClick={() => setLang('bn')} aria-pressed={lang === 'bn'}>
        বাং
      </button>
    </div>
  );
}
