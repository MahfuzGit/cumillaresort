'use client';
import { useMemo } from 'react';
import AdminTopbar from '../../../../components/AdminTopbar';
import Icon from '../../../../components/Icons';
import { useLang } from '../../../../lib/i18n';
import { adminBookings, adminGuests, bookingBillingMap, fmtTaka } from '../../../../lib/data';

export default function BookingDetailPage({ params }) {
  const { t, n, L } = useLang();
  const { ref } = params;

  const booking = useMemo(() => adminBookings.find((b) => b.ref === ref), [ref]);
  const guest = useMemo(() => booking ? adminGuests.find((g) => g.name.en === booking.guest.en) : null, [booking]);
  const billing = useMemo(() => bookingBillingMap[ref] || {}, [ref]);

  if (!booking) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
        {t('common.demoNote')}
      </div>
    );
  }

  const net = (billing.subTotal || booking.total) + (billing.tax || 0) - (billing.discount || 0);

  return (
    <>
      <AdminTopbar title={t('admin.bookings.detailTitle')} sub={booking.ref} />

      {/* -------- INVOICE SECTION -------- */}
      <div className="acard" style={{ marginBottom: 24, borderLeft: '4px solid var(--gold)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 className="serif">{t('admin.bookings.invoiceTitle')}</h2>
            <div className="hint">{booking.ref}</div>
          </div>
          <button className="btn-admin" onClick={() => window.print()}>
            <Icon name="printer" size={15} stroke={2} /> {t('admin.print.btn')}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Left: Invoice Details */}
          <div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: 4 }}>{t('admin.bookings.invoiceNo')}</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, fontFamily: 'var(--font-head)' }}>{booking.ref}</div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: 4 }}>{t('admin.bookings.invoiceDate')}</div>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>{n(10)} {L({ en: 'Jun', bn: 'জুন' })} {L({ en: '2026', bn: '২০২৬' })}</div>
            </div>
            <div>
              <div style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: 4 }}>{t('admin.bookings.dueDate')}</div>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>
                {L(booking.out)} {L({ en: '2026', bn: '২০২৬' })}
              </div>
            </div>
          </div>

          {/* Right: Guest Details */}
          <div>
            <div style={{ fontSize: '.75rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>
              {t('admin.bookings.guestInfo')}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{L(booking.guest)}</div>
            <div style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
              {guest?.from ? L(guest.from) : '—'}<br />
              {guest?.prefs ? L(guest.prefs).split('·')[0].trim() : '—'}
            </div>
          </div>
        </div>

        {/* Room & Stay Details */}
        <div style={{ background: 'var(--cream)', padding: 16, borderRadius: 8, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div>
              <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: 4 }}>{t('admin.bookings.roomType')}</div>
              <div style={{ fontSize: '.95rem', fontWeight: 700 }}>{L(booking.villa)}</div>
            </div>
            <div>
              <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: 4 }}>{t('admin.bookings.checkIn')}</div>
              <div style={{ fontSize: '.95rem', fontWeight: 700 }}>{L(booking.in)}</div>
            </div>
            <div>
              <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: 4 }}>{t('admin.bookings.checkOut')}</div>
              <div style={{ fontSize: '.95rem', fontWeight: 700 }}>{L(booking.out)}</div>
            </div>
          </div>
        </div>

        {/* Billing Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
          <tbody>
            <tr style={{ borderTop: '1px solid var(--cream)' }}>
              <td style={{ padding: '12px 0', fontSize: '.95rem' }}>{t('admin.bookings.nights')}</td>
              <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>{n(billing.nights || 1)}</td>
            </tr>
            <tr style={{ borderTop: '1px solid var(--cream)' }}>
              <td style={{ padding: '12px 0', fontSize: '.95rem' }}>{t('admin.bookings.roomRate')}</td>
              <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>
                {fmtTaka(billing.ratePerNight || booking.total, n)}
              </td>
            </tr>
            <tr style={{ borderTop: '1px solid var(--cream)' }}>
              <td style={{ padding: '12px 0', fontSize: '.95rem', fontWeight: 700 }}>{t('admin.bookings.subtotal')}</td>
              <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 700 }}>
                {fmtTaka(billing.subTotal || booking.total, n)}
              </td>
            </tr>
            <tr style={{ borderTop: '1px solid var(--cream)' }}>
              <td style={{ padding: '12px 0', fontSize: '.95rem' }}>{t('admin.bookings.taxRate')}</td>
              <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>
                {fmtTaka(billing.tax || 0, n)}
              </td>
            </tr>
            {billing.discount > 0 && (
              <tr style={{ borderTop: '1px solid var(--cream)' }}>
                <td style={{ padding: '12px 0', fontSize: '.95rem', color: 'var(--green)' }}>{t('admin.bookings.discount')}</td>
                <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600, color: 'var(--green)' }}>
                  −{fmtTaka(billing.discount, n)}
                </td>
              </tr>
            )}
            <tr style={{ borderTop: '2px solid var(--forest)', background: 'var(--cream)' }}>
              <td style={{ padding: '16px 0', fontSize: '1.15rem', fontWeight: 700 }}>{t('admin.bookings.total')}</td>
              <td style={{ padding: '16px 0', textAlign: 'right', fontSize: '1.25rem', fontWeight: 700, color: 'var(--forest)' }}>
                {fmtTaka(net, n)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Payment Status */}
        <div style={{ background: 'rgba(30,142,90,.08)', padding: 16, borderRadius: 8, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: 6 }}>{t('admin.bookings.paidAmount')}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--green)' }}>
              {fmtTaka(billing.paid || 0, n)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: 6 }}>{t('admin.bookings.pendingAmount')}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: billing.pending > 0 ? 'var(--red)' : 'var(--green)' }}>
              {fmtTaka(billing.pending || 0, n)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginBottom: 6 }}>{t('admin.bookings.paymentStatus')}</div>
            <div>
              <span
                className={`badge ${
                  billing.paymentStatus === 'paid'
                    ? 'b-green'
                    : billing.paymentStatus === 'pending'
                      ? 'b-red'
                      : billing.paymentStatus === 'partial'
                        ? 'b-amber'
                        : 'b-grey'
                }`}
              >
                {t(`admin.bookings.${billing.paymentStatus || 'pending'}`)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* -------- BOOKING SUMMARY -------- */}
      <div className="acard">
        <h2 className="serif">{t('admin.bookings.billingTitle')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 16 }}>
          <div>
            <div style={{ fontSize: '.75rem', color: 'var(--muted)', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.05em' }}>
              {t('admin.bookings.stayInfo')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{t('admin.bookings.checkIn')}</div>
                <div style={{ fontWeight: 600 }}>{L(booking.in)} {L({ en: '2026', bn: '২০২৬' })}</div>
              </div>
              <div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{t('admin.bookings.checkOut')}</div>
                <div style={{ fontWeight: 600 }}>{L(booking.out)} {L({ en: '2026', bn: '২০২৬' })}</div>
              </div>
              <div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{t('admin.bookings.nights')}</div>
                <div style={{ fontWeight: 600 }}>{n(billing.nights || 1)}</div>
              </div>
              <div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{t('admin.bookings.bookingChannel')}</div>
                <div style={{ fontWeight: 600 }}>{L(booking.channel)}</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '.75rem', color: 'var(--muted)', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.05em' }}>
              {t('admin.bookings.roomInfo')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{t('admin.bookings.roomType')}</div>
                <div style={{ fontWeight: 600 }}>{L(booking.villa)}</div>
              </div>
              <div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{t('admin.bookings.roomRate')}</div>
                <div style={{ fontWeight: 600 }}>{fmtTaka(billing.ratePerNight || billing.subTotal / billing.nights, n)} / {t('admin.bookings.nights')}</div>
              </div>
              <div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{t('admin.table.status')}</div>
                <div>
                  <span
                    className={`badge ${
                      booking.status === 'checkedIn' ? 'b-green' : booking.status === 'pending' ? 'b-amber' : booking.status === 'confirmed' ? 'b-blue' : 'b-grey'
                    }`}
                  >
                    {t(`admin.status.${booking.status}`)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
