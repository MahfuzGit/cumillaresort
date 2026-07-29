'use client';
import { useState } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { villas, msgTemplates, fmtTaka } from '../../../lib/data';

export default function SettingsPage() {
  const { t, n, L, lang, setLang } = useLang();
  const [toggles, setToggles] = useState([true, true, false, true]);

  return (
    <>
      <AdminTopbar title={t('admin.settings.title')} sub={t('admin.settings.sub')} />

      <div className="settings-grid">
        {/* Profile */}
        <div className="acard">
          <div className="card-head"><h2 className="serif">{t('admin.settings.profile')}</h2></div>
          <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="field">
              <label htmlFor="s-name">{t('admin.settings.resortName')}</label>
              <input id="s-name" defaultValue={t('brand.full')} />
            </div>
            <div className="field">
              <label htmlFor="s-tag">{t('admin.settings.tagline')}</label>
              <input id="s-tag" defaultValue={t('admin.settings.taglineVal')} />
            </div>
            <div className="field">
              <label htmlFor="s-addr">{t('admin.settings.addr')}</label>
              <textarea id="s-addr" defaultValue={t('contact.addressVal')} style={{ minHeight: 80 }} />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="acard">
          <div className="card-head"><h2 className="serif">{t('admin.settings.prefs')}</h2></div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="s-lang">{t('admin.settings.defaultLang')}</label>
              <select id="s-lang" value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value="en">{t('admin.settings.english')}</option>
                <option value="bn">{t('admin.settings.bangla')}</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="s-cur">{t('admin.settings.currency')}</label>
              <select id="s-cur" defaultValue="BDT">
                <option value="BDT">BDT (৳)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="s-in">{t('admin.settings.checkInTime')}</label>
              <input id="s-in" type="time" defaultValue="14:00" />
            </div>
            <div className="field">
              <label htmlFor="s-out">{t('admin.settings.checkOutTime')}</label>
              <input id="s-out" type="time" defaultValue="11:30" />
            </div>
          </div>

          <div className="card-head" style={{ marginTop: 26 }}><h2 className="serif">{t('admin.settings.notif')}</h2></div>
          {t('admin.settings.notifList').map((label, i) => (
            <div className="toggle-row" key={i}>
              <span>{label}</span>
              <button
                className={`switch${toggles[i] ? ' on' : ''}`}
                onClick={() => setToggles(toggles.map((v, j) => (j === i ? !v : v)))}
                role="switch"
                aria-checked={toggles[i]}
                aria-label={label}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Rates */}
      <div className="acard" style={{ marginTop: 18 }}>
        <div className="card-head"><h2 className="serif">{t('admin.settings.rates')}</h2></div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>{t('admin.table.villa')}</th><th>{t('admin.rooms.units')}</th><th>{t('common.guests')}</th><th>{t('admin.settings.rates')}</th></tr>
            </thead>
            <tbody>
              {villas.map((v) => (
                <tr key={v.slug}>
                  <td><b>{L(v.name)}</b></td>
                  <td>{n(v.units)}</td>
                  <td>{n(v.guests)}</td>
                  <td style={{ maxWidth: 180 }}>
                    <div className="field" style={{ margin: 0 }}>
                      <input defaultValue={fmtTaka(v.price, n)} aria-label={`${L(v.name)} rate`} style={{ padding: '9px 13px' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 22 }}>
          <button className="btn-admin" onClick={() => alert(t('admin.settings.saved'))}>
            <Icon name="check" size={15} stroke={2.4} /> {t('admin.settings.save')}
          </button>
        </div>
      </div>

      {/* SMS / Email templates */}
      <div className="acard" style={{ marginTop: 18, borderLeft: '4px solid var(--gold)' }}>
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.settings.tplTitle')}</h2>
            <div className="hint">{t('admin.settings.tplHint')}</div>
          </div>
          <button className="btn-admin no-print" onClick={() => alert(t('admin.settings.tplSaved'))}>
            <Icon name="check" size={15} stroke={2.4} /> {t('admin.settings.tplSave')}
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {msgTemplates.map((tpl) => (
            <div className="field" key={tpl.key} style={{ margin: 0 }}>
              <label htmlFor={`tpl-${tpl.key}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {L(tpl.name)}
                <span className={`badge ${tpl.channel === 'SMS' ? 'b-blue' : 'b-amber'}`}>{tpl.channel}</span>
              </label>
              <textarea id={`tpl-${tpl.key}`} key={`${tpl.key}-${L(tpl.name)}`} defaultValue={L(tpl.body)} style={{ minHeight: tpl.channel === 'Email' ? 170 : 96 }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
