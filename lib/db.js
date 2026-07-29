import { neon } from '@neondatabase/serverless';
import { Pool } from 'pg';
import { adminBookings, feedbackLog, bookingBillingMap } from './data';

let lazySql = null;
let bookingsStore = null;
let reviewsStore = null;
let cmsStore = null;

// Helper to convert 'Jun 12' to '2026-06-12'
function parseMockDate(str) {
  if (!str) return '2026-06-10';
  const parts = str.split(' ');
  const monthMap = { Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
  const month = monthMap[parts[0]] || '06';
  const day = String(parts[1]).padStart(2, '0');
  return `2026-${month}-${day}`;
}

function initMockDb() {
  if (!bookingsStore) {
    bookingsStore = adminBookings.map((b, index) => {
      const checkInStr = b.in && b.in.en ? b.in.en : 'Jun 10';
      const checkOutStr = b.out && b.out.en ? b.out.en : 'Jun 15';
      const billing = bookingBillingMap[b.ref] || {};
      return {
        id: 'mock-booking-' + index,
        ref: b.ref,
        guest_name: b.guest.en,
        guest_email: (b.guest.en.toLowerCase().replace(/[^a-z0-9]/g, '') || 'guest') + '@example.com',
        guest_phone: '+880 1711 ' + String(100000 + index),
        villa_slug: b.villa.en.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        villa_name: b.villa.en,
        check_in: parseMockDate(checkInStr),
        check_out: parseMockDate(checkOutStr),
        nights: billing.nights || 3,
        adults: 2,
        children: 0,
        price_per_night: billing.ratePerNight || (b.total / (billing.nights || 3)) || 12500,
        total: b.total,
        advance_paid: billing.paid || 0,
        channel: b.channel.en || 'Direct',
        status: b.status,
        notes: null,
        created_at: new Date(Date.now() - (index * 86400000)).toISOString()
      };
    });
  }

  if (!reviewsStore) {
    reviewsStore = feedbackLog.map((f, index) => {
      const dateStr = f.date && f.date.en ? f.date.en : 'Jun 10';
      return {
        id: 'mock-review-' + index,
        guest_name: f.guest.en,
        rating: f.rating,
        comment: f.text.en,
        villa_slug: f.villa.en.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        villa_name: f.villa.en,
        approved: f.status === 'resolved',
        created_at: parseMockDate(dateStr) + 'T12:00:00.000Z'
      };
    });
  }
}

async function mockSql(strings, ...values) {
  initMockDb();
  
  const query = strings.join('?').replace(/\s+/g, ' ').trim();
  console.log(`[Mock DB Query]: ${query}`, values);
  
  // SELECT * FROM cms_settings
  if (query.includes('FROM cms_settings') || query.includes('SELECT * FROM cms_settings')) {
    return [cmsStore].filter(Boolean);
  }
  
  // INSERT INTO cms_settings
  if (query.startsWith('INSERT INTO cms_settings') || query.includes('INSERT INTO cms_settings')) {
    cmsStore = {
      id: 1,
      hero_img: values[0],
      hero_eyebrow: typeof values[1] === 'string' ? JSON.parse(values[1]) : values[1],
      hero_title1: typeof values[2] === 'string' ? JSON.parse(values[2]) : values[2],
      hero_title_em: typeof values[3] === 'string' ? JSON.parse(values[3]) : values[3],
      hero_title2: typeof values[4] === 'string' ? JSON.parse(values[4]) : values[4],
      hero_sub: typeof values[5] === 'string' ? JSON.parse(values[5]) : values[5],
      nav_json: typeof values[6] === 'string' ? JSON.parse(values[6]) : values[6],
      sections_json: typeof values[7] === 'string' ? JSON.parse(values[7]) : values[7],
      custom_json: typeof values[8] === 'string' ? JSON.parse(values[8]) : values[8],
      updated_at: new Date().toISOString()
    };
    return { success: true };
  }
  
  // DELETE FROM cms_settings
  if (query.includes('DELETE FROM cms_settings')) {
    cmsStore = null;
    return { success: true };
  }
  
  // INSERT INTO contact_messages
  if (query.startsWith('INSERT INTO contact_messages') || query.includes('INSERT INTO contact_messages')) {
    return { success: true };
  }
  
  // INSERT INTO bookings
  if (query.startsWith('INSERT INTO bookings') || query.includes('INSERT INTO bookings')) {
    const newBooking = {
      id: 'mock-booking-' + Date.now(),
      ref: values[0],
      guest_name: values[1],
      guest_email: values[2],
      guest_phone: values[3],
      villa_slug: values[4],
      villa_name: values[5],
      check_in: values[6],
      check_out: values[7],
      nights: Number(values[8]),
      adults: Number(values[9]),
      children: Number(values[10]),
      price_per_night: Number(values[11]),
      total: Number(values[12]),
      advance_paid: 0,
      channel: 'Direct',
      status: 'pending',
      notes: values[13] || null,
      created_at: new Date().toISOString()
    };
    bookingsStore.unshift(newBooking);
    return { success: true };
  }
  
  // SELECT ... FROM bookings
  if (query.includes('FROM bookings') || query.includes('SELECT ref, guest_name')) {
    return bookingsStore;
  }
  
  // SELECT ... FROM reviews WHERE approved = true
  if (query.includes('FROM reviews') && query.includes('approved = true')) {
    return reviewsStore.filter(r => r.approved);
  }
  
  // SELECT ... FROM reviews ORDER BY created_at DESC
  if (query.includes('FROM reviews')) {
    return reviewsStore;
  }
  
  // INSERT INTO reviews
  if (query.startsWith('INSERT INTO reviews') || query.includes('INSERT INTO reviews')) {
    const newReview = {
      id: 'mock-review-' + Date.now(),
      guest_name: values[0],
      rating: Number(values[1]),
      comment: values[2],
      villa_slug: values[3],
      villa_name: values[4],
      approved: false,
      created_at: new Date().toISOString()
    };
    reviewsStore.unshift(newReview);
    return { success: true };
  }
  
  // UPDATE reviews SET approved = true WHERE id = ...
  if (query.includes('UPDATE reviews') && query.includes('approved = true')) {
    const reviewId = values[0];
    reviewsStore = reviewsStore.map(r => r.id === reviewId ? { ...r, approved: true } : r);
    return { success: true };
  }
  
  return [];
}

let pgPool = null;

async function pgSql(strings, ...values) {
  if (!pgPool) {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  
  // Convert parameterized template tag to pg parameters ($1, $2...)
  let queryText = strings[0];
  for (let i = 1; i < strings.length; i++) {
    queryText += `$${i}` + strings[i];
  }
  
  const client = await pgPool.connect();
  try {
    const res = await client.query(queryText, values);
    return res.rows;
  } finally {
    client.release();
  }
}

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || databaseUrl.includes('postgres://[user]') || databaseUrl.includes('your-neon-url')) {
    return mockSql;
  }
  
  if (databaseUrl.includes('neon.tech')) {
    if (!lazySql) {
      lazySql = neon(databaseUrl);
    }
    return lazySql;
  }
  
  return pgSql;
}

// Export a proxy so it behaves exactly like a template tag or function
export const sql = new Proxy(() => {}, {
  apply(target, thisArg, argumentsList) {
    return getSql()(...argumentsList);
  },
  get(target, prop) {
    return getSql()[prop];
  }
});
