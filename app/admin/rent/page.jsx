'use client';
import { useState } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { villas, extraCharges, TAX_PCT, fmtTaka } from '../../../lib/data';

const FIELD = {
  display: 'block', width: '100%', padding: '11px 13px', borderRadius: 10,
  border: '1.5px solid var(--cream)', background: '#fff', fontSize: '.92rem',
  fontFamily: 'inherit', color: 'var(--ink)',
};
const LABEL = { display: 'block', fontSize: '.78rem', fontWeight: 700, color: 'var(--muted)', marginBottom: 6 };

export default function RentPage() {
  const { t, n, L } = useLang();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [villaIdx, setVillaIdx] = useState(0);
  const [nights, setNights] = useState(2);
  const [adults, setAdults] = useState(2);
  const [extras, setExtras] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [confirmedRef, setConfirmedRef] = useState(null);

  const villa = villas[villaIdx];
  const roomCharge = villa.price * nights;
  const extraOf = (x) =>
    x.per === 'perNight' ? x.amount * nights : x.per === 'perPerson' ? x.amount * adults : x.amount;
  const extrasTotal = extraCharges.filter((x) => extras.includes(x.key)).reduce((a, x) => a + extraOf(x), 0);
  const subtotal = roomCharge + extrasTotal;
  const tax = Math.round(subtotal * (TAX_PCT / 100));
  const total = subtotal + tax - (Number(discount) || 0);

  const toggleExtra = (key) =>
    setExtras((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const confirm = () => {
    if (!name.trim() || !phone.trim()) { alert(t('admin.rent.fillWarn')); return; }
    setConfirmedRef('NR-1043');
  };

  const reset = () => {
    setName(''); setPhone(''); setVillaIdx(0); setNights(2); setAdults(2);
    setExtras([]); setDiscount(0); setConfirmedRef(null);
  };

  return (
    <>
      <AdminTopbar title={t('admin.rent.title')} sub={t('admin.rent.sub')} />

      {confirmedRef ? (
        /* -------- SUCCESS / RECEIPT -------- */
        <div className="acard" style={{ maxWidth: 640, margin: '0 auto', borderLeft: '4px solid var(--green)' }}>
          <div style={{ textAlign: 'center', padding: '14px 0 6px' }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'rgba(30,142,90,.12)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <Icon name="check" size={26} stroke={2.6} />
            </div>
            <h2 className="serif" style={{ marginBottom: 6 }}>{t('admin.rent.successTitle')}</h2>
            <div style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: 18 }}>
              {t('admin.rent.successSub')}: <b style={{ color: 'var(--forest)' }}>{confirmedRef}</b>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
            <tbody>
              <tr style={{ borderTop: '1px solid var(--cream)' }}>
                <td style={{ padding: '10px 0' }}>{t('admin.rent.guestName')}</td>
                <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 700 }}>{name}</td>
              </tr>
              <tr style={{ borderTop: '1px solid var(--cream)' }}>
                <td style={{ padding: '10px 0' }}>{t('admin.rent.guestPhone')}</td>
                <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 700 }}>{phone}</td>
              </tr>
              <tr style={{ borderTop: '1px solid var(--cream)' }}>
                <td style={{ padding: '10px 0' }}>{t('admin.rent.villaType')}</td>
                <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 700 }}>{L(villa.name)} · {n(nights)} {t('admin.rent.nightsUnit')}</td>
              </tr>
              <tr style={{ borderTop: '1px solid var(--cream)' }}>
                <td style={{ padding: '10px 0' }}>{t('admin.bookings.taxRate')}</td>
                <td style={{ padding: '10px 0', textAlign: 'right' }}>{fmtTaka(tax, n)}</td>
              </tr>
              <tr style={{ borderTop: '2px solid var(--forest)', background: 'var(--cream)' }}>
                <td style={{ padding: '13px 0', fontWeight: 700, fontSize: '1.05rem' }}>{t('admin.bookings.total')}</td>
                <td style={{ padding: '13px 0', textAlign: 'right', fontWeight: 700, fontSize: '1.15rem', color: 'var(--forest)' }}>{fmtTaka(total, n)}</td>
              </tr>
            </tbody>
          </table>
          <div className="no-print" style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button className="btn-admin" onClick={() => window.print()}>
              <Icon name="printer" size={15} stroke={2} /> {t('admin.print.btn')}
            </button>
            <button className="btn-admin" style={{ background: 'var(--forest)', color: '#fff' }} onClick={reset}>
              <Icon name="plus" size={15} stroke={2.4} /> {t('admin.rent.another')}
            </button>
          </div>
        </div>
      ) : (
        /* -------- FORM + LIVE BILL -------- */
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="acard" style={{ marginBottom: 0 }}>
            <div className="card-head">
              <div>
                <h2 className="serif">{t('admin.rent.formTitle')}</h2>
                <div className="hint">{t('admin.rent.formHint')}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={LABEL}>{t('admin.rent.guestName')}</label>
                <input style={FIELD} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('admin.rent.namePh')} />
              </div>
              <div>
                <label style={LABEL}>{t('admin.rent.guestPhone')}</label>
                <input style={FIELD} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t('admin.rent.phonePh')} />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={LABEL}>{t('admin.rent.villaType')}</label>
              <select style={FIELD} value={villaIdx} onChange={(e) => setVillaIdx(Number(e.target.value))}>
                {villas.map((v, i) => (
                  <option key={v.slug} value={i}>
                    {L(v.name)} — ৳{n(v.price)} {t('common.perNight')}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
              <div>
                <label style={LABEL}>{t('admin.rent.checkInDate')}</label>
                <input style={FIELD} type="date" defaultValue="2026-06-11" />
              </div>
              <div>
                <label style={LABEL}>{t('admin.rent.nights')}</label>
                <input style={FIELD} type="number" min={1} max={30} value={nights} onChange={(e) => setNights(Math.max(1, Number(e.target.value) || 1))} />
              </div>
              <div>
                <label style={LABEL}>{t('admin.rent.adults')}</label>
                <input style={FIELD} type="number" min={1} max={8} value={adults} onChange={(e) => setAdults(Math.max(1, Number(e.target.value) || 1))} />
              </div>
            </div>

            <label style={LABEL}>{t('admin.rent.extras')}</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {extraCharges.map((x) => (
                <label key={x.key} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.9rem', cursor: 'pointer', padding: '9px 12px', borderRadius: 9, background: extras.includes(x.key) ? 'rgba(30,142,90,.08)' : 'var(--cream)' }}>
                  <input type="checkbox" checked={extras.includes(x.key)} onChange={() => toggleExtra(x.key)} />
                  <span style={{ flex: 1 }}>{L(x.label)}</span>
                  <b>{fmtTaka(x.amount, n)} <small style={{ color: 'var(--muted)', fontWeight: 400 }}>{t(`admin.charges.${x.per}`)}</small></b>
                </label>
              ))}
            </div>

            <div style={{ maxWidth: 220 }}>
              <label style={LABEL}>{t('admin.rent.discount')}</label>
              <input style={FIELD} type="number" min={0} value={discount} onChange={(e) => setDiscount(Math.max(0, Number(e.target.value) || 0))} />
            </div>
          </div>

          {/* Live bill */}
          <div className="acard" style={{ marginBottom: 0, borderLeft: '4px solid var(--gold)', position: 'sticky', top: 16 }}>
            <h2 className="serif" style={{ marginBottom: 14 }}>{t('admin.rent.billTitle')}</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderTop: '1px solid var(--cream)' }}>
                  <td style={{ padding: '11px 0', fontSize: '.92rem' }}>
                    {t('admin.rent.roomCharge')}
                    <div style={{ fontSize: '.76rem', color: 'var(--muted)' }}>{L(villa.name)} × {n(nights)} {t('admin.rent.nightsUnit')}</div>
                  </td>
                  <td style={{ padding: '11px 0', textAlign: 'right', fontWeight: 600 }}>{fmtTaka(roomCharge, n)}</td>
                </tr>
                {extraCharges.filter((x) => extras.includes(x.key)).map((x) => (
                  <tr key={x.key} style={{ borderTop: '1px solid var(--cream)' }}>
                    <td style={{ padding: '11px 0', fontSize: '.88rem', color: 'var(--muted)' }}>+ {L(x.label)}</td>
                    <td style={{ padding: '11px 0', textAlign: 'right', fontWeight: 600 }}>{fmtTaka(extraOf(x), n)}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '1px solid var(--cream)' }}>
                  <td style={{ padding: '11px 0', fontWeight: 700 }}>{t('admin.bookings.subtotal')}</td>
                  <td style={{ padding: '11px 0', textAlign: 'right', fontWeight: 700 }}>{fmtTaka(subtotal, n)}</td>
                </tr>
                <tr style={{ borderTop: '1px solid var(--cream)' }}>
                  <td style={{ padding: '11px 0', fontSize: '.92rem' }}>{t('admin.bookings.taxRate')}</td>
                  <td style={{ padding: '11px 0', textAlign: 'right', fontWeight: 600 }}>{fmtTaka(tax, n)}</td>
                </tr>
                {Number(discount) > 0 && (
                  <tr style={{ borderTop: '1px solid var(--cream)' }}>
                    <td style={{ padding: '11px 0', fontSize: '.92rem', color: 'var(--green)' }}>{t('admin.bookings.discount')}</td>
                    <td style={{ padding: '11px 0', textAlign: 'right', fontWeight: 600, color: 'var(--green)' }}>−{fmtTaka(Number(discount), n)}</td>
                  </tr>
                )}
                <tr style={{ borderTop: '2px solid var(--forest)', background: 'var(--cream)' }}>
                  <td style={{ padding: '14px 0', fontWeight: 700, fontSize: '1.08rem' }}>{t('admin.bookings.total')}</td>
                  <td style={{ padding: '14px 0', textAlign: 'right', fontWeight: 700, fontSize: '1.25rem', color: 'var(--forest)' }}>{fmtTaka(total, n)}</td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn-admin no-print"
              style={{ width: '100%', justifyContent: 'center', marginTop: 16, background: 'var(--forest)', color: '#fff', padding: '13px' }}
              onClick={confirm}
            >
              <Icon name="check" size={16} stroke={2.4} /> {t('admin.rent.confirmBtn')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
