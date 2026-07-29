'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { adminBookings, bookingBillingMap, fmtTaka, IMG } from '../../lib/data';

const METHODS = [
  { key: 'bkash', label: 'bKash', color: '#d12053' },
  { key: 'nagad', label: 'Nagad', color: '#ec1c24' },
  { key: 'card', label: 'Visa / Mastercard', color: '#1a1f71' },
];

export default function MyBookingPage() {
  const { t, n, L } = useLang();
  const [ref, setRef] = useState('');
  const [phone, setPhone] = useState('');
  const [booking, setBooking] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [paying, setPaying] = useState(false);
  const [method, setMethod] = useState('bkash');
  const [paidNow, setPaidNow] = useState(false);

  const billing = booking ? bookingBillingMap[booking.ref] : null;
  const pending = paidNow ? 0 : (billing?.pending ?? 0);

  const find = (e) => {
    e.preventDefault();
    const b = adminBookings.find((x) => x.ref.toLowerCase() === ref.trim().toLowerCase());
    setBooking(b || null);
    setNotFound(!b);
    setPaying(false);
    setPaidNow(false);
  };

  const reset = () => { setBooking(null); setRef(''); setPhone(''); setNotFound(false); setPaying(false); setPaidNow(false); };

  return (
    <>
      <Navbar solid />
      <PageHero title={t('myb.pageTitle')} subtitle={t('myb.pageSub')} image={IMG.heroBooking} />

      <section style={{ paddingTop: 64 }}>
        <div className="container" style={{ maxWidth: 680 }}>
          {!booking ? (
            /* -------- LOOKUP -------- */
            <Reveal>
              <div className="acard" style={{ borderLeft: '4px solid var(--gold)' }}>
                <form className="form-grid" onSubmit={find}>
                  <div className="field">
                    <label htmlFor="mb-ref">{t('myb.refLbl')}</label>
                    <input id="mb-ref" value={ref} onChange={(e) => setRef(e.target.value)} placeholder="NR-1040" required />
                  </div>
                  <div className="field">
                    <label htmlFor="mb-phone">{t('myb.phoneLbl')}</label>
                    <input id="mb-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 17XX XXXXXX" required />
                  </div>
                  <button className="btn btn-gold" type="submit" style={{ gridColumn: '1 / -1' }}>
                    <Icon name="search" size={15} stroke={2.2} /> {t('myb.find')}
                  </button>
                </form>
                {notFound && (
                  <p style={{ color: 'var(--red)', fontSize: '.9rem', marginTop: 14, marginBottom: 0 }}>{t('myb.notFound')}</p>
                )}
              </div>
            </Reveal>
          ) : (
            /* -------- BOOKING FOUND -------- */
            <Reveal>
              <button className="text-link" style={{ marginBottom: 14, fontSize: '.86rem' }} onClick={reset}>{t('myb.backSearch')}</button>

              <div className="acard" style={{ borderLeft: '4px solid var(--gold)', marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <h2 className="serif" style={{ marginBottom: 4 }}>{t('myb.yourStay')}</h2>
                    <div className="hint">{booking.ref}</div>
                  </div>
                  <span className={`badge ${booking.status === 'checkedIn' ? 'b-green' : booking.status === 'confirmed' ? 'b-blue' : 'b-amber'}`}>
                    {t(`admin.status.${booking.status}`)}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginTop: 16 }}>
                  <div>
                    <div style={{ fontSize: '.74rem', color: 'var(--muted)' }}>{t('admin.table.guest')}</div>
                    <b>{L(booking.guest)}</b>
                  </div>
                  <div>
                    <div style={{ fontSize: '.74rem', color: 'var(--muted)' }}>{t('admin.table.villa')}</div>
                    <b>{L(booking.villa)}</b>
                  </div>
                  <div>
                    <div style={{ fontSize: '.74rem', color: 'var(--muted)' }}>{t('common.checkIn')}</div>
                    <b>{L(booking.in)} {L({ en: '2026', bn: '২০২৬' })}</b>
                  </div>
                  <div>
                    <div style={{ fontSize: '.74rem', color: 'var(--muted)' }}>{t('common.checkOut')}</div>
                    <b>{L(booking.out)} {L({ en: '2026', bn: '২০২৬' })}</b>
                  </div>
                </div>
              </div>

              {/* Billing */}
              {billing && (
                <div className="acard">
                  <h2 className="serif" style={{ marginBottom: 14 }}>{t('myb.billing')}</h2>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ borderTop: '1px solid var(--cream)' }}>
                        <td style={{ padding: '10px 0' }}>{t('admin.bookings.subtotal')}</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 600 }}>{fmtTaka(billing.subTotal, n)}</td>
                      </tr>
                      <tr style={{ borderTop: '1px solid var(--cream)' }}>
                        <td style={{ padding: '10px 0' }}>{t('admin.bookings.taxRate')}</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 600 }}>{fmtTaka(billing.tax, n)}</td>
                      </tr>
                      <tr style={{ borderTop: '1px solid var(--cream)' }}>
                        <td style={{ padding: '10px 0', color: 'var(--green)' }}>{t('admin.bookings.paidAmount')}</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 700, color: 'var(--green)' }}>{fmtTaka(billing.paid + (paidNow ? billing.pending : 0), n)}</td>
                      </tr>
                      <tr style={{ borderTop: '2px solid var(--forest)', background: 'var(--cream)' }}>
                        <td style={{ padding: '13px 0', fontWeight: 700 }}>{t('admin.bookings.pendingAmount')}</td>
                        <td style={{ padding: '13px 0', textAlign: 'right', fontWeight: 700, fontSize: '1.1rem', color: pending > 0 ? 'var(--red)' : 'var(--green)' }}>
                          {fmtTaka(pending, n)}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {pending === 0 && (
                    <p style={{ color: 'var(--green)', fontWeight: 700, marginTop: 16, marginBottom: 0 }}>
                      {paidNow ? `${t('myb.paySuccess')} ${t('myb.receiptNo')}: RCPT-${L({ en: '8821', bn: '৮৮২১' })}` : t('myb.settled')}
                    </p>
                  )}

                  {pending > 0 && !paying && (
                    <button className="btn btn-gold" style={{ width: '100%', marginTop: 18 }} onClick={() => setPaying(true)}>
                      <Icon name="taka" size={16} stroke={2} /> {t('myb.payNow')} — {fmtTaka(pending, n)}
                    </button>
                  )}

                  {/* Payment mock */}
                  {pending > 0 && paying && (
                    <div style={{ marginTop: 18, border: '1.5px solid var(--cream)', borderRadius: 14, padding: 18 }}>
                      <div style={{ fontWeight: 700, marginBottom: 10 }}>{t('myb.method')}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 }}>
                        {METHODS.map((mth) => (
                          <button key={mth.key} type="button" onClick={() => setMethod(mth.key)}
                            style={{
                              padding: '12px 6px', borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 800, fontSize: '.82rem',
                              border: `2px solid ${method === mth.key ? mth.color : 'var(--cream)'}`,
                              color: mth.color, background: method === mth.key ? `${mth.color}11` : '#fff',
                            }}>
                            {mth.label}
                          </button>
                        ))}
                      </div>
                      <div className="form-grid">
                        <div className="field">
                          <label htmlFor="pay-no">{method === 'card' ? t('myb.cardNo') : t('myb.mobileNo')}</label>
                          <input id="pay-no" placeholder={method === 'card' ? '4242 4242 4242 4242' : '01XXXXXXXXX'} />
                        </div>
                        <div className="field">
                          <label htmlFor="pay-pin">{t('myb.pin')}</label>
                          <input id="pay-pin" type="password" placeholder="••••" />
                        </div>
                      </div>
                      <button className="btn btn-gold" style={{ width: '100%', marginTop: 6 }}
                        onClick={() => { setPaidNow(true); setPaying(false); }}>
                        {t('myb.payBtn')} {fmtTaka(pending, n)}
                      </button>
                      <p style={{ fontSize: '.76rem', color: 'var(--muted)', textAlign: 'center', marginTop: 10, marginBottom: 0 }}>{t('myb.payNote')}</p>
                    </div>
                  )}
                </div>
              )}
            </Reveal>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
