'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icons';
import { useLang } from '../../lib/i18n';
import { IMG } from '../../lib/data';

export default function FeaturesPage() {
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState('guest'); // 'guest' or 'admin'

  const content = {
    en: {
      title: 'App Features Directory',
      sub: 'A comprehensive map of all guest-facing portals and internal administration modules built into this application.',
      tabGuest: 'Public Guest Portals',
      tabAdmin: 'Internal Management OS',
      subGuest: 'Engaging, fast, and responsive user experiences for resort visitors.',
      subAdmin: 'Advanced backend tools built for staff operations, finance, and logistics.',
      guestFeatures: [
        {
          title: 'Bilingual Reservation Wizard',
          icon: 'calendar',
          path: '/booking',
          desc: 'A seamless 4-step wizard for date searches, room availability filtering, guest details input, and reservation booking with live calculations.'
        },
        {
          title: 'Live Availability Calendar',
          icon: 'area',
          path: '/availability',
          desc: 'A real-time search interface checking dates and displaying exactly which of the 32 villas are free or occupied.'
        },
        {
          title: 'My Booking Portal',
          icon: 'users',
          path: '/my-booking',
          desc: 'Guest lookup interface where visitors can search by reference (e.g. NR-1040) to view stays, generate invoices, and make demo bKash payments.'
        },
        {
          title: 'Villas & Sanctuary Directory',
          icon: 'home',
          path: '/villas',
          desc: 'A beautiful catalog of villas and cottages. Clicking details navigates to a dynamic sub-route displaying features, specs, and price-per-night details.'
        },
        {
          title: 'Curated Experiences & Tours',
          icon: 'tree',
          path: '/experiences',
          desc: 'A visually immersive list of excursions (Mainamati heritage tour, Lalmai trekking, boating) with difficulty level indicators and booking prompts.'
        },
        {
          title: 'Fine Dining & Menus',
          icon: 'dining',
          path: '/dining',
          desc: 'Showcase of the resort restaurants (Moynamoti, Lalmai Lounge, Agun) with opening hours, detailed specialties, and signature dishes.'
        },
        {
          title: 'Around Us Explore Map',
          icon: 'globe',
          path: '/explore',
          desc: 'A clean directory of nearby tourist attractions in Cumilla, mapping distance in km and driving times in minutes.'
        },
        {
          title: 'Contextual Help Assistant',
          icon: 'message',
          path: '#',
          desc: 'A predefined interactive chat widget floating on every page with instantly resolving Q&A buttons and a WhatsApp trigger.'
        }
      ],
      adminFeatures: [
        {
          title: 'Operations Dashboard',
          icon: 'dashboard',
          path: '/admin',
          desc: 'An analytical dashboard summarizing occupancy, arrivals, requests, MTD revenue, accommodation channels mix, and occupancy trend line graphs.'
        },
        {
          title: 'Master Booking Calendar',
          icon: 'calendar',
          path: '/admin/calendar',
          desc: 'A day-by-day visual occupancy grid where managers can track guest stays, room shifts, and occupancy dates at a glance.'
        },
        {
          title: 'Front Desk check-ins queue',
          icon: 'bell',
          path: '/admin/frontdesk',
          desc: 'An operational dashboard showing expected arrivals/departures, check-in prompts, status transitions, and final bill clearances.'
        },
        {
          title: 'Point of Sale (POS) Terminal',
          icon: 'dining',
          path: '/admin/pos',
          desc: 'A digital checkout system for food and beverage items that can post billing transactions directly to an in-house room folio.'
        },
        {
          title: 'Housekeeping Operations',
          icon: 'broom',
          path: '/admin/housekeeping',
          desc: 'A real-time checklist tracking clean/dirty rooms, assigning staff shifts, and managing cleaning priority markers.'
        },
        {
          title: 'Inventory & Stock Alerts',
          icon: 'box',
          path: '/admin/inventory',
          desc: 'Supply log tracking items value, vendor logs, active purchase orders, and automatic red warnings for low-stock levels.'
        },
        {
          title: 'Dynamic Roles & Permissions',
          icon: 'shield',
          path: '/admin/roles',
          desc: 'A dashboard permitting Super Admins to define custom roles (e.g. receptionist), assign system access scopes, and save permissions.'
        },
        {
          title: 'Landing Page CMS Editor',
          icon: 'globe',
          path: '/admin/cms',
          desc: 'A control page allowing editors to live-update landing banners, announcement messages, page visibility toggles, and section items.'
        },
        {
          title: 'HR & Payroll Ledger',
          icon: 'wallet',
          path: '/admin/hr',
          desc: 'Roster lists generating staff work shifts logs, overtime calculations, monthly attendance stats, and salary sheets.'
        },
        {
          title: 'Finance & Accounts ledger',
          icon: 'taka',
          path: '/admin/finance',
          desc: 'Financial log capturing MTD bills, accommodation mix, restaurant revenue, and a detailed balance ledger sheet.'
        }
      ]
    },
    bn: {
      title: 'সিস্টেম ফিচার ডিরেক্টরি',
      sub: 'এই অ্যাপ্লিকেশনে বিল্ট-ইন সব পাবলিক কাস্টমার পোর্টাল এবং অভ্যন্তরীণ প্রশাসনিক মডিউলগুলোর একটি বিস্তারিত তালিকা।',
      tabGuest: 'পাবলিক কাস্টমার পোর্টাল',
      tabAdmin: 'অভ্যন্তরীণ ম্যানেজমেন্ট সিস্টেম',
      subGuest: 'রিসোর্ট ভিজিটরদের জন্য আকর্ষণীয়, দ্রুত এবং রেসপনসিভ ইউজার এক্সপেরিয়েন্স।',
      subAdmin: 'স্টাফ অপারেশন, ফাইন্যান্স এবং লজিস্টিকস পরিচালনার জন্য উন্নত ব্যাকএন্ড টুলস।',
      guestFeatures: [
        {
          title: 'দ্বিভাষিক রিজার্ভেশন উইজার্ড',
          icon: 'calendar',
          path: '/booking',
          desc: 'তারিখ অনুসন্ধান, ভিলা ফিল্টারিং, অতিথিদের বিবরণ ইনপুট এবং লাইভ হিসাব সহ ৪-ধাপের একটি বুকিং প্রক্রিয়া।'
        },
        {
          title: 'লাইভ রুম প্রাপ্যতা ক্যালেন্ডার',
          icon: 'area',
          path: '/availability',
          desc: 'একটি লাইভ সার্চ ইন্টারফেস যা নির্দিষ্ট তারিখ চেক করে ৩২টি ভিলার কোনটি খালি বা বুকড তা দেখায়।'
        },
        {
          title: 'আমার বুকিং পোর্টাল',
          icon: 'users',
          path: '/my-booking',
          desc: 'অতিথিদের বুকিং ট্র্যাকিং সিস্টেম। বুকিং রেফারেন্স (যেমন NR-1040) দিয়ে বিল ও ইনভয়েস দেখতে এবং বিকাশ ডেমো পেমেন্ট করতে পারবেন।'
        },
        {
          title: 'ভিলা ও কটেজ ডিরেক্টরি',
          icon: 'home',
          path: '/villas',
          desc: 'পাবলিক ভিলার তালিকা। ক্লিক করলে প্রতিটি ভিলার সুযোগ-সুবিধা, স্পেসিফিকেশন ও ভাড়ার ডাইনামিক সাব-পেজে নিয়ে যায়।'
        },
        {
          title: 'ট্যুর ও অভিজ্ঞতা সমূহ',
          icon: 'tree',
          path: '/experiences',
          desc: 'ময়নামতি হেরিটেজ ট্যুর, ট্রেকিং বা নৌকা ভ্রমণের মতো আকর্ষণের তালিকা, সাথে কঠিনতার মাত্রা ও বুকিং অপশন।'
        },
        {
          title: 'রেস্টুরেন্ট ও সুস্বাদু মেনু',
          icon: 'dining',
          path: '/dining',
          desc: 'ময়নামতি ঐতিহ্যের টেবিল, লালমাই লাউঞ্জ ও আগুন রেস্টুরেন্টের খোলার সময়, বিবরণ এবং সিগনেচার ডিশের প্রদর্শনী।'
        },
        {
          title: 'কুমিল্লা ভ্রমণ গাইড',
          icon: 'globe',
          path: '/explore',
          desc: 'কুমিল্লার ঐতিহাসিক দর্শনীয় স্থানসমূহের দূরত্ব (কিমি) এবং যাতায়াতের সময় (মিনিট) সহ একটি পরিচ্ছন্ন নির্দেশিকা।'
        },
        {
          title: 'সহকারী চ্যাট উইজেট',
          icon: 'message',
          path: '#',
          desc: 'সব পেজে ভাসমান চ্যাট সাহায্যকারী। সাধারণ প্রশ্নের তাত্ক্ষণিক উত্তর বোতাম এবং হোয়াটসঅ্যাপ চ্যাট ট্রিগার।'
        }
      ],
      adminFeatures: [
        {
          title: 'অপারেশনস ড্যাশবোর্ড',
          icon: 'dashboard',
          path: '/admin',
          desc: 'রুম দখল হার, আগমন, বকেয়া এবং আয়ের গ্রাফিকাল বিশ্লেষণ সহ ম্যানেজারদের প্রধান ড্যাশবোর্ড।'
        },
        {
          title: 'মাস্টার বুকিং ক্যালেন্ডার',
          icon: 'calendar',
          path: '/admin/calendar',
          desc: 'একটি দিনভিত্তিক ভিলা চার্ট যা সমস্ত বুকিং ও ফাঁকা রুমগুলোর অবস্থান দৃশ্যমানভাবে ট্র্যাক করে।'
        },
        {
          title: 'ফ্রন্ট ডেস্ক চেক-ইন কিউ',
          icon: 'bell',
          path: '/admin/frontdesk',
          desc: 'আজকের আগমন ও প্রস্থান, চেক-ইন বাটন এবং পেমেন্ট মিটমাটের লাইভ ফ্রন্টডেস্ক ট্র্যাক তালিকা।'
        },
        {
          title: 'রেস্টুরেন্ট POS টার্মিনাল',
          icon: 'dining',
          path: '/admin/pos',
          desc: 'অর্ডার বিল সরাসরি অতিথির রুম ফোলিওতে পোস্ট করা যায়।'
        },
        {
          title: 'হাউসকিপিং শিফট বোর্ড',
          icon: 'broom',
          path: '/admin/housekeeping',
          desc: 'পরিষ্কার/অপরিষ্কার রুম ট্র্যাকিং, কর্মীদের শিফট দায়িত্ব এবং অগ্রাধিকারের ভিত্তিতে পরিচ্ছন্নতার কাজ বণ্টন।'
        },
        {
          title: 'ইনভেন্টরি ও স্টক সতর্কতা',
          icon: 'box',
          path: '/admin/inventory',
          desc: 'রসদপত্র, সরবরাহকারী ও পারচেজ অর্ডার ট্র্যাকার। স্টক রিঅর্ডার লেভেলের নিচে নামলে লাল সতর্ক সংকেত।'
        },
        {
          title: 'ডাইনামিক রোল ও পারমিশন',
          icon: 'shield',
          path: '/admin/roles',
          desc: 'সুপার এডমিনের জন্য কাস্টম রোল (যেমন: রিসেপশনিস্ট) তৈরি করা এবং পেজভিত্তিক অ্যাক্সেস টগল করার বোর্ড।'
        },
        {
          title: 'ল্যান্ডিং পেজ CMS এডিটর',
          icon: 'globe',
          path: '/admin/cms',
          desc: 'হোমপেজ ব্যানার, ঘোষণা, মেনু এবং বিভিন্ন সেকশন লাইভ এডিট ও প্রদর্শন বা গোপন করার প্যানেল।'
        },
        {
          title: 'এইচআর ও পেরোল লেজার',
          icon: 'wallet',
          path: '/admin/hr',
          desc: 'কর্মচারীদের উপস্থিতি, শিফট রোস্টার, অতিরিক্ত কর্মঘণ্টা এবং মাসিক বেতন শীট তৈরির ক্যালকুলেটর।'
        },
        {
          title: 'ফাইন্যান্স ও অ্যাকাউন্টস লেজার',
          icon: 'taka',
          path: '/admin/finance',
          desc: 'আবাসন ও রেস্টুরেন্ট আয়ের অনুপাত এবং দৈনিক ব্যালেন্স লেজার বিবরণীর সমন্বিত অর্থনৈতিক খাত।'
        }
      ]
    }
  };

  const curr = content[lang] || content.en;
  const featuresList = activeTab === 'guest' ? curr.guestFeatures : curr.adminFeatures;

  return (
    <>
      <Navbar solid />

      <PageHero
        title={curr.title}
        subtitle={curr.sub}
        image={IMG.heroOffers}
      />

      <section className="features-section" style={{ padding: '60px 0', background: 'var(--ivory)' }}>
        <div className="container">
          
          {/* TABS SELECTOR */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 40
          }}>
            <button
              onClick={() => setActiveTab('guest')}
              className="btn"
              style={{
                background: activeTab === 'guest' ? 'var(--jade)' : 'transparent',
                color: activeTab === 'guest' ? '#fff' : 'var(--jade)',
                border: '1px solid var(--jade)',
                borderRadius: '30px',
                padding: '12px 28px',
                fontSize: '1rem',
                fontWeight: 500,
                boxShadow: activeTab === 'guest' ? '0 8px 24px rgba(12,43,42,0.15)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {curr.tabGuest}
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className="btn"
              style={{
                background: activeTab === 'admin' ? 'var(--jade)' : 'transparent',
                color: activeTab === 'admin' ? '#fff' : 'var(--jade)',
                border: '1px solid var(--jade)',
                borderRadius: '30px',
                padding: '12px 28px',
                fontSize: '1rem',
                fontWeight: 500,
                boxShadow: activeTab === 'admin' ? '0 8px 24px rgba(12,43,42,0.15)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {curr.tabAdmin}
            </button>
          </div>

          {/* TAB SUB-HEADER */}
          <div style={{ textAlign: 'center', marginBottom: 50, maxWidth: 600, margin: '0 auto 50px auto' }}>
            <h3 className="serif" style={{ fontSize: '1.8rem', color: 'var(--jade)', marginBottom: 12 }}>
              {activeTab === 'guest' ? curr.tabGuest : curr.tabAdmin}
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>
              {activeTab === 'guest' ? curr.subGuest : curr.subAdmin}
            </p>
          </div>

          {/* FEATURES GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 28
          }}>
            {featuresList.map((feat, idx) => (
              <Reveal key={idx} delay={idx % 4} variant="blur">
                <div style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  padding: 30,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="feature-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(12,43,42,0.08)';
                  e.currentTarget.style.borderColor = 'var(--champagne)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--line)';
                }}
                >
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: '12px',
                    background: 'rgba(201,164,107,0.12)',
                    color: 'var(--champagne)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon name={feat.icon} size={24} stroke={1.8} />
                  </div>
                  <div>
                    <h4 className="serif" style={{ fontSize: '1.3rem', color: 'var(--jade)', marginBottom: 8 }}>
                      {feat.title}
                    </h4>
                    <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 12 }}>
                      {feat.desc}
                    </p>
                  </div>

                  {feat.path !== '#' && (
                    <a
                      href={feat.path}
                      style={{
                        marginTop: 'auto',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        color: 'var(--champagne)',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                      className="learn-more-link"
                    >
                      {lang === 'bn' ? 'ব্যবহার করুন →' : 'Launch Module →'}
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
