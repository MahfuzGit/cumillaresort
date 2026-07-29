'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminTopbar from '../../../components/AdminTopbar';
import { useLang } from '../../../lib/i18n';
import { publicRoomBookings, roomTypes } from '../../../lib/data';

// Months shown in the grid: June–August 2026
const MONTHS = [
  { m: 6, days: 30 },
  { m: 7, days: 31 },
  { m: 8, days: 31 },
];
const TODAY = '2026-06-11';

const iso = (m, d) => `2026-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export default function CalendarPage() {
  const { t, n, L } = useLang();
  const router = useRouter();
  const [mi, setMi] = useState(0);
  const { m, days } = MONTHS[mi];

  // Booking covering a given day for a room (day is booked if from <= day < to)
  const bookingAt = (room, dayIso) =>
    room.bookings.find((b) => b.from <= dayIso && dayIso < b.to);

  // Month occupancy %: booked room-nights / total room-nights
  const totalNights = publicRoomBookings.length * days;
  let bookedNights = 0;
  publicRoomBookings.forEach((r) => {
    for (let d = 1; d <= days; d++) if (bookingAt(r, iso(m, d))) bookedNights++;
  });
  const occPct = Math.round((bookedNights / totalNights) * 100);

  return (
    <>
      <AdminTopbar title={t('admin.calendar.title')} sub={t('admin.calendar.sub')} />

      <div className="acard">
        <div className="card-head">
          <div>
            <div className="pill-tabs">
              {t('admin.calendar.months').map((label, i) => (
                <button key={i} className={mi === i ? 'on' : ''} onClick={() => setMi(i)}>{label}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '.85rem', color: 'var(--muted)' }}>
              {t('admin.calendar.occupancyOfMonth')}: <b style={{ color: 'var(--forest)' }}>{n(occPct)}%</b>
            </span>
            <div className="legend">
              <span><i style={{ background: 'var(--forest)' }} />{t('admin.calendar.legendBooked')}</span>
              <span><i style={{ background: 'var(--cream)', border: '1px solid var(--muted)' }} />{t('admin.calendar.legendFree')}</span>
              <span><i style={{ background: 'var(--gold)' }} />{t('admin.calendar.legendToday')}</span>
            </div>
          </div>
        </div>

        <div className="hint" style={{ marginBottom: 14 }}>{t('admin.calendar.clickHint')}</div>

        <div className="cal-wrap">
          <table className="cal-table">
            <thead>
              <tr>
                <th className="cal-room">{t('admin.calendar.room')}</th>
                {Array.from({ length: days }, (_, i) => (
                  <th key={i}>{n(i + 1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roomTypes.map((rt) =>
                publicRoomBookings
                  .filter((r) => r.typeKey === rt.key)
                  .map((room) => (
                    <tr key={`${rt.key}-${room.no}`}>
                      <td className="cal-room">{L(room.label)} {n(room.no)}</td>
                      {Array.from({ length: days }, (_, i) => {
                        const dayIso = iso(m, i + 1);
                        const bk = bookingAt(room, dayIso);
                        const isToday = dayIso === TODAY;
                        if (!bk) {
                          return (
                            <td key={i} className={`cal-cell${isToday ? ' today' : ''}`}
                              onClick={() => router.push('/admin/rent')} />
                          );
                        }
                        const isStart = bk.from === dayIso;
                        // checkout day is bk.to (exclusive) → last booked night is to-1
                        const nextIso = iso(m, i + 2);
                        const isEnd = bk.to === nextIso || i + 1 === days;
                        return (
                          <td key={i} className={isToday ? 'cal-cell today' : undefined} style={{ cursor: 'default' }}>
                            <div
                              className={`cal-bar${isStart ? ' start' : ''}${isEnd ? ' end' : ''}`}
                              title={`${L(bk.guest)} · ${bk.from} → ${bk.to}`}
                            >
                              {isStart && <span className="cal-guest">{L(bk.guest)}</span>}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
