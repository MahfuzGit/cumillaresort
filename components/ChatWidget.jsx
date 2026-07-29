'use client';
// Floating help-chat mock for the public site (canned Q&A, no backend).
import { useState } from 'react';
import { useLang } from '../lib/i18n';
import Icon from './Icons';

export default function ChatWidget() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState([]); // {who:'g'|'b', text}

  const ask = (i) => {
    setThread((p) => [...p, { who: 'g', text: t('chat.qs')[i] }, { who: 'b', text: t('chat.as')[i] }]);
  };

  return (
    <div className="chat-widget no-print">
      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <Icon name="leaf" size={17} stroke={1.8} />
            <strong>{t('chat.title')}</strong>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><Icon name="close" size={16} stroke={2.2} /></button>
          </div>
          <div className="chat-body">
            <div className="chat-msg bot">{t('chat.hello')}</div>
            {thread.map((mes, i) => (
              <div key={i} className={`chat-msg ${mes.who === 'g' ? 'guest' : 'bot'}`}>{mes.text}</div>
            ))}
          </div>
          <div className="chat-qs">
            {t('chat.qs').map((q, i) => (
              <button key={i} onClick={() => ask(i)}>{q}</button>
            ))}
            <a href="https://wa.me/8801711555123" target="_blank" rel="noopener" className="chat-wa">
              <Icon name="phone" size={13} stroke={2.2} /> {t('chat.whatsapp')}
            </a>
          </div>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen((o) => !o)} aria-label={t('chat.title')}>
        <Icon name={open ? 'close' : 'mail'} size={22} stroke={2} />
      </button>
    </div>
  );
}
