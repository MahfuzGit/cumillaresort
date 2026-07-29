'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '../../../lib/i18n';
import LangToggle from '../../../components/LangToggle';
import Icon from '../../../components/Icons';
import { IMG } from '../../../lib/data';

export default function AdminLogin() {
  const router = useRouter();
  const { t, L } = useLang();
  const [role, setRole] = useState('superadmin');
  const [email, setEmail] = useState('superadmin@admin.com');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roles, setRoles] = useState([
    { 
      key: 'superadmin', 
      icon: 'award', 
      label: { en: 'Super Admin', bn: 'সুপার এডমিন' }, 
      hint: { 
        en: 'Credentials: superadmin@admin.com / admin. Full system access. Note: This is a read-only demo; you cannot permanently edit or enter new data.', 
        bn: 'লগইন: superadmin@admin.com / admin। পূর্ণ সিস্টেম অ্যাক্সেস। দ্রষ্টব্য: এটি ডেমো; স্থায়ীভাবে কোনো তথ্য পরিবর্তন বা সংরক্ষণ করা যাবে না।' 
      } 
    },
    { 
      key: 'gm', 
      icon: 'award', 
      label: { en: 'General Manager', bn: 'জেনারেল ম্যানেজার' }, 
      hint: { 
        en: 'Credentials: gm@admin.com / admin. Access to all operational modules. Note: This is a read-only demo; you cannot permanently edit or enter new data.', 
        bn: 'লগইন: gm@admin.com / admin। সব মডিউলে অ্যাক্সেস। দ্রষ্টব্য: এটি ডেমো; স্থায়ীভাবে কোনো তথ্য পরিবর্তন বা সংরক্ষণ করা যাবে না।' 
      } 
    },
    { 
      key: 'frontdesk', 
      icon: 'bell', 
      label: { en: 'Front Desk', bn: 'ফ্রন্ট ডেস্ক' }, 
      hint: { 
        en: 'Credentials: frontdesk@admin.com / admin. Bookings, guests & billing. Note: This is a read-only demo; you cannot permanently edit or enter new data.', 
        bn: 'লগইন: frontdesk@admin.com / admin। বুকিং ও বিলিং। দ্রষ্টব্য: এটি ডেমো; স্থায়ীভাবে কোনো তথ্য পরিবর্তন বা সংরক্ষণ করা যাবে না।' 
      } 
    },
    { 
      key: 'housekeeping', 
      icon: 'broom', 
      label: { en: 'Housekeeping', bn: 'হাউসকিপিং' }, 
      hint: { 
        en: 'Credentials: housekeeping@admin.com / admin. Tasks and rooms log only. Note: This is a read-only demo; you cannot permanently edit or enter new data.', 
        bn: 'লগইন: housekeeping@admin.com / admin। শুধু টাস্ক ও রুম। দ্রষ্টব্য: এটি ডেমো; স্থায়ীভাবে কোনো তথ্য পরিবর্তন বা সংরক্ষণ করা যাবে না।' 
      } 
    },
  ]);

  useEffect(() => {
    // Load custom roles from localStorage
    try {
      const savedCustom = localStorage.getItem('cumilla-custom-roles');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        setRoles((prev) => {
          const base = [
            { 
              key: 'superadmin', 
              icon: 'award', 
              label: { en: 'Super Admin', bn: 'সুপার এডমিন' }, 
              hint: { 
                en: 'Credentials: superadmin@admin.com / admin. Full system access. Note: This is a read-only demo; you cannot permanently edit or enter new data.', 
                bn: 'লগইন: superadmin@admin.com / admin। পূর্ণ সিস্টেম অ্যাক্সেস। দ্রষ্টব্য: এটি ডেমো; স্থায়ীভাবে কোনো তথ্য পরিবর্তন বা সংরক্ষণ করা যাবে না।' 
              } 
            },
            { 
              key: 'gm', 
              icon: 'award', 
              label: { en: 'General Manager', bn: 'জেনারেল ম্যানেজার' }, 
              hint: { 
                en: 'Credentials: gm@admin.com / admin. Access to all operational modules. Note: This is a read-only demo; you cannot permanently edit or enter new data.', 
                bn: 'লগইন: gm@admin.com / admin। সব মডিউলে অ্যাক্সেস। দ্রষ্টব্য: এটি ডেমো; স্থায়ীভাবে কোনো তথ্য পরিবর্তন বা সংরক্ষণ করা যাবে না।' 
              } 
            },
            { 
              key: 'frontdesk', 
              icon: 'bell', 
              label: { en: 'Front Desk', bn: 'ফ্রন্ট ডেস্ক' }, 
              hint: { 
                en: 'Credentials: frontdesk@admin.com / admin. Bookings, guests & billing. Note: This is a read-only demo; you cannot permanently edit or enter new data.', 
                bn: 'লগইন: frontdesk@admin.com / admin। বুকিং ও বিলিং। দ্রষ্টব্য: এটি ডেমো; স্থায়ীভাবে কোনো তথ্য পরিবর্তন বা সংরক্ষণ করা যাবে না।' 
              } 
            },
            { 
              key: 'housekeeping', 
              icon: 'broom', 
              label: { en: 'Housekeeping', bn: 'হাউসকিপিং' }, 
              hint: { 
                en: 'Credentials: housekeeping@admin.com / admin. Tasks and rooms log only. Note: This is a read-only demo; you cannot permanently edit or enter new data.', 
                bn: 'লগইন: housekeeping@admin.com / admin। শুধু টাস্ক ও রুম। দ্রষ্টব্য: এটি ডেমো; স্থায়ীভাবে কোনো তথ্য পরিবর্তন বা সংরক্ষণ করা যাবে না।' 
              } 
            },
          ];
          const custom = parsed.filter(cr => !base.some(b => b.key === cr.key));
          return [...base, ...custom];
        });
      }
    } catch { /* ignore */ }
  }, []);

  const activeRole = roles.find((r) => r.key === role) || roles[0];

  const handleRoleSelect = (roleKey) => {
    setRole(roleKey);
    setEmail(`${roleKey}@admin.com`);
    setPassword('admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // POST credentials to server — server sets HttpOnly cookie
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.message || 'Login failed');
        setLoading(false);
        return;
      }

      const { role_key } = await response.json();

      // Store role for client-side UI gating (non-sensitive, just for navigation)
      const finalRole = role_key || role;
      try { localStorage.setItem('cumilla-role', finalRole); } catch { /* ignore */ }

      // Redirect based on role
      router.push(finalRole === 'housekeeping' ? '/admin/housekeeping' : '/admin');
    } catch (err) {
      setError('Network error — please try again');
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap" style={{ backgroundImage: `url('${IMG.heroHome}')` }}>
      <div className="login-card" style={{ maxWidth: 500, width: '90%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
          <LangToggle dark />
        </div>
        <div className="logo">
          <Icon name="leaf" size={30} stroke={1.6} />
          {t('brand.name')}
        </div>
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 4, fontWeight: 700 }}>{t('admin.login.title')}</p>
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '.9rem', marginBottom: 28 }}>{t('admin.login.sub')}</p>
        
        <form
          className="form-grid"
          style={{ gridTemplateColumns: '1fr' }}
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label>{t('admin.login.signInAs')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))', gap: 8 }}>
              {roles.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => handleRoleSelect(r.key)}
                  title={L(r.hint)}
                  style={{
                    padding: '10px 4px', borderRadius: 11, cursor: 'pointer', fontFamily: 'inherit',
                    border: `2px solid ${role === r.key ? 'var(--gold)' : 'var(--cream)'}`,
                    background: role === r.key ? 'rgba(201,162,39,.10)' : '#fff',
                    color: role === r.key ? 'var(--forest)' : 'var(--muted)',
                    fontWeight: 700, fontSize: '.76rem', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 6,
                  }}
                >
                  <Icon name={r.icon || 'shield'} size={18} stroke={1.9} />
                  {L(r.label)}
                </button>
              ))}
            </div>
            <div style={{ fontSize: '.76rem', color: 'var(--muted)', marginTop: 8, fontStyle: 'italic' }}>
              {L(activeRole.hint)}
            </div>
          </div>
          <div className="field">
            <label htmlFor="l-email">{t('admin.login.email')}</label>
            <input
              id="l-email"
              type="email"
              placeholder="maya@cumillaresort.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="l-pass">{t('admin.login.password')}</label>
            <input
              id="l-pass"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div style={{
              background: 'rgba(192,69,44,.10)', color: 'var(--red)', border: '1px solid rgba(192,69,44,.25)',
              borderRadius: 10, padding: '10px 14px', fontSize: '.88rem', fontWeight: 600,
            }}>
              {error}
            </div>
          )}
          <button
            className="btn btn-gold"
            type="submit"
            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? '...' : t('admin.login.signIn')}
          </button>
        </form>
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '.83rem', marginTop: 18 }}>{t('admin.login.hint')}</p>
        <p style={{ textAlign: 'center', marginTop: 14 }}>
          <Link href="/" style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '.88rem' }}>{t('admin.login.backSite')}</Link>
        </p>
      </div>

      {loading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(14, 33, 25, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          color: '#fff',
          animation: 'fadeIn 0.25s ease'
        }}>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .spinner {
              width: 50px;
              height: 50px;
              border: 3px solid rgba(255, 255, 255, 0.15);
              border-top: 3px solid var(--gold, #C9A227);
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
              margin-bottom: 20px;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
          <div className="spinner"></div>
          <div style={{ fontFamily: 'var(--font-head), serif', fontSize: '1.25rem', fontWeight: 600 }}>
            Signing In / সাইন ইন হচ্ছে…
          </div>
        </div>
      )}
    </div>
  );
}
