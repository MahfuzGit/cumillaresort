'use client';
import { useState, useEffect } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';

const NAV_PAGES = [
  {
    group: 'operations',
    items: ['dashboard', 'bookings', 'calendar', 'rent', 'rooms', 'guests']
  },
  {
    group: 'guestcare',
    items: ['frontdesk', 'prebooking', 'dues', 'membership', 'feedback']
  },
  {
    group: 'resort',
    items: ['housekeeping', 'pos', 'inventory', 'staff', 'hr', 'finance', 'cms', 'reports', 'settings', 'roles']
  }
];

const DEFAULT_ROLES = {
  superadmin: null,
  gm: ['dashboard', 'bookings', 'calendar', 'rent', 'rooms', 'guests', 'frontdesk', 'prebooking', 'dues', 'membership', 'feedback', 'housekeeping', 'pos', 'inventory', 'staff', 'hr', 'finance', 'cms', 'reports', 'settings'],
  frontdesk: ['dashboard', 'bookings', 'calendar', 'rent', 'rooms', 'guests', 'frontdesk', 'prebooking', 'dues', 'membership', 'feedback', 'pos'],
  housekeeping: ['housekeeping', 'rooms', 'inventory', 'staff'],
};

const ICONS = ['award', 'bell', 'broom', 'users', 'shield', 'settings', 'taka', 'wallet', 'home', 'calendar'];

export default function RolesPage() {
  const { t, L } = useLang();
  
  // Custom roles lists
  const [customRoles, setCustomRoles] = useState([]);
  
  // Stored permissions state
  const [permissions, setPermissions] = useState(DEFAULT_ROLES);
  
  // Active role selected for editing permissions
  const [selectedRole, setSelectedRole] = useState('superadmin');
  
  // Form fields for creating a custom role
  const [newRoleKey, setNewRoleKey] = useState('');
  const [newNameEn, setNewNameEn] = useState('');
  const [newNameBn, setNewNameBn] = useState('');
  const [newHintEn, setNewHintEn] = useState('');
  const [newHintBn, setNewHintBn] = useState('');
  const [newIcon, setNewIcon] = useState('shield');

  // Success toast/message state
  const [toast, setToast] = useState('');

  // Load custom roles and permissions from localStorage on mount
  useEffect(() => {
    try {
      const savedCustom = localStorage.getItem('cumilla-custom-roles');
      if (savedCustom) setCustomRoles(JSON.parse(savedCustom));
      
      const savedPermissions = localStorage.getItem('cumilla-role-permissions');
      if (savedPermissions) {
        setPermissions(JSON.parse(savedPermissions));
      } else {
        localStorage.setItem('cumilla-role-permissions', JSON.stringify(DEFAULT_ROLES));
        setPermissions(DEFAULT_ROLES);
      }
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // Combine default roles and custom roles
  const systemRoles = [
    { key: 'superadmin', icon: 'award', label: { en: 'Super Admin', bn: 'সুপার এডমিন' }, hint: { en: 'Full system access & custom permissions config', bn: 'পূর্ণ সিস্টেম অ্যাক্সেস এবং কাস্টম পারমিশন কনফিগারেশন' } },
    { key: 'gm', icon: 'award', label: { en: 'General Manager', bn: 'জেনারেল ম্যানেজার' }, hint: { en: 'Full access — every module', bn: 'পূর্ণ অ্যাক্সেস — সব মডিউল' } },
    { key: 'frontdesk', icon: 'bell', label: { en: 'Front Desk', bn: 'ফ্রন্ট ডেস্ক' }, hint: { en: 'Bookings, guests, front desk & billing', bn: 'বুকিং, অতিথি, ফ্রন্ট ডেস্ক ও বিলিং' } },
    { key: 'housekeeping', icon: 'broom', label: { en: 'Housekeeping', bn: 'হাউসকিপিং' }, hint: { en: 'Tasks, rooms & cleaning log only', bn: 'শুধু টাস্ক, রুম ও পরিচ্ছন্নতা লগ' } },
    ...customRoles
  ];

  // Helper to generate a unique key safely
  const handleCreateRole = (e) => {
    e.preventDefault();
    if (!newRoleKey || !newNameEn || !newNameBn) return;
    
    const cleanKey = newRoleKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (systemRoles.some((r) => r.key === cleanKey)) {
      alert('Role key already exists / এই রোল কি ইতিমধ্যেই বিদ্যমান');
      return;
    }

    const newRole = {
      key: cleanKey,
      icon: newIcon,
      label: { en: newNameEn, bn: newNameBn },
      hint: { en: newHintEn || 'Custom Role', bn: newHintBn || 'কাস্টম রোল' }
    };

    const nextCustom = [...customRoles, newRole];
    const nextPermissions = { ...permissions, [cleanKey]: ['dashboard'] }; // start with dashboard access

    try {
      localStorage.setItem('cumilla-custom-roles', JSON.stringify(nextCustom));
      localStorage.setItem('cumilla-role-permissions', JSON.stringify(nextPermissions));
    } catch {
      /* ignore */
    }

    setCustomRoles(nextCustom);
    setPermissions(nextPermissions);
    setSelectedRole(cleanKey);

    // reset fields
    setNewRoleKey('');
    setNewNameEn('');
    setNewNameBn('');
    setNewHintEn('');
    setNewHintBn('');
    setNewIcon('shield');

    showToast(t('admin.roles.createdSuccess'));
  };

  // Delete a custom role
  const handleDeleteRole = (key) => {
    if (!confirm('Are you sure you want to delete this role? / আপনি কি নিশ্চিত আপনি এই রোলটি মুছতে চান?')) return;
    
    const nextCustom = customRoles.filter((cr) => cr.key !== key);
    const nextPermissions = { ...permissions };
    delete nextPermissions[key];

    try {
      localStorage.setItem('cumilla-custom-roles', JSON.stringify(nextCustom));
      localStorage.setItem('cumilla-role-permissions', JSON.stringify(nextPermissions));
    } catch {
      /* ignore */
    }

    setCustomRoles(nextCustom);
    setPermissions(nextPermissions);
    setSelectedRole('superadmin');
    showToast(t('admin.roles.deletedSuccess'));
  };

  // Toggle page permission checkbox
  const handleTogglePermission = (pageKey) => {
    if (selectedRole === 'superadmin') return; // superadmin always has access to everything
    
    const currentAllowed = permissions[selectedRole] || [];
    let nextAllowed;
    if (currentAllowed.includes(pageKey)) {
      nextAllowed = currentAllowed.filter((k) => k !== pageKey);
    } else {
      nextAllowed = [...currentAllowed, pageKey];
    }

    setPermissions({
      ...permissions,
      [selectedRole]: nextAllowed
    });
  };

  // Save current role permissions
  const handleSavePermissions = () => {
    try {
      localStorage.setItem('cumilla-role-permissions', JSON.stringify(permissions));
      showToast(t('admin.roles.savedSuccess'));
    } catch {
      alert('Save failed / সংরক্ষণ ব্যর্থ হয়েছে');
    }
  };

  // Reset to original settings
  const handleResetToDefaults = () => {
    if (!confirm('Reset all roles & permissions to defaults? This will erase all custom configurations. / সব রোল ও পারমিশন ডিফল্টে ফিরিয়ে আনবেন?')) return;
    try {
      localStorage.removeItem('cumilla-custom-roles');
      localStorage.setItem('cumilla-role-permissions', JSON.stringify(DEFAULT_ROLES));
      
      setCustomRoles([]);
      setPermissions(DEFAULT_ROLES);
      setSelectedRole('superadmin');
      showToast(t('admin.roles.resetSuccess'));
    } catch {
      /* ignore */
    }
  };

  const allowedForSelected = permissions[selectedRole] || [];

  return (
    <>
      <AdminTopbar title={t('admin.roles.title')} sub={t('admin.roles.sub')} />

      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, background: 'var(--forest)', color: '#fff',
          padding: '12px 24px', borderRadius: 10, boxShadow: 'var(--shadow)', zIndex: 1000,
          fontWeight: 700, animation: 'fadeIn .3s'
        }}>
          {toast}
        </div>
      )}

      <div className="settings-grid">
        {/* Creator Form Panel */}
        <div className="acard">
          <div className="card-head">
            <h2 className="serif">{t('admin.roles.createBtn')}</h2>
          </div>
          <form className="form-grid" style={{ gridTemplateColumns: '1fr' }} onSubmit={handleCreateRole}>
            <div className="field">
              <label htmlFor="r-key">Role Key / আইডেন্টিফায়ার (English lowercase only)</label>
              <input id="r-key" type="text" placeholder={t('admin.roles.namePh')} value={newRoleKey} onChange={(e) => setNewRoleKey(e.target.value)} required />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field">
                <label htmlFor="r-name-en">Role Name (English)</label>
                <input id="r-name-en" type="text" placeholder="e.g. Receptionist" value={newNameEn} onChange={(e) => setNewNameEn(e.target.value)} required />
              </div>
              <div className="field">
                <label htmlFor="r-name-bn">রোল নাম (বাংলা)</label>
                <input id="r-name-bn" type="text" placeholder="যেমন: রিসেপশনিস্ট" value={newNameBn} onChange={(e) => setNewNameBn(e.target.value)} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field">
                <label htmlFor="r-hint-en">Hint / Description (English)</label>
                <input id="r-hint-en" type="text" placeholder={t('admin.roles.hintPh')} value={newHintEn} onChange={(e) => setNewHintEn(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="r-hint-bn">বিবরণ / হিন্ট (বাংলা)</label>
                <input id="r-hint-bn" type="text" placeholder="যেমন: ড্যাশবোর্ড ও বুকিং দেখতে পারবেন" value={newHintBn} onChange={(e) => setNewHintBn(e.target.value)} />
              </div>
            </div>

            <div className="field">
              <label>{t('admin.roles.iconLbl')}</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ICONS.map((ico) => (
                  <button
                    key={ico}
                    type="button"
                    onClick={() => setNewIcon(ico)}
                    style={{
                      padding: 10, borderRadius: 8, cursor: 'pointer', border: `2px solid ${newIcon === ico ? 'var(--gold)' : 'var(--cream)'}`,
                      background: newIcon === ico ? 'rgba(201,162,39,.10)' : '#fff', color: newIcon === ico ? 'var(--forest)' : 'var(--muted)'
                    }}
                  >
                    <Icon name={ico} size={18} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button className="btn btn-gold" type="submit" style={{ flex: 1 }}>
                <Icon name="plus" size={16} stroke={2.5} style={{ marginRight: 6 }} /> {t('admin.roles.createBtn')}
              </button>
              <button className="btn btn-outline" type="button" onClick={handleResetToDefaults}>
                {t('admin.roles.resetBtn')}
              </button>
            </div>
          </form>
        </div>

        {/* Permissions Manager Panel */}
        <div className="acard">
          <div className="card-head">
            <h2 className="serif">{t('admin.roles.title')}</h2>
          </div>
          
          {/* Role selector tab bars */}
          <div className="field">
            <label>Select Role to Configure Permissions / রোল নির্বাচন করুন</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8, marginTop: 8 }}>
              {systemRoles.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setSelectedRole(r.key)}
                  style={{
                    padding: '10px 6px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                    border: `2px solid ${selectedRole === r.key ? 'var(--gold)' : 'var(--cream)'}`,
                    background: selectedRole === r.key ? 'rgba(201,162,39,.10)' : '#fff',
                    color: selectedRole === r.key ? 'var(--forest)' : 'var(--muted)',
                    fontWeight: 700, fontSize: '.76rem', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 4
                  }}
                >
                  <Icon name={r.icon || 'shield'} size={16} />
                  {L(r.label)}
                </button>
              ))}
            </div>
            <div style={{ fontSize: '.76rem', color: 'var(--muted)', marginTop: 8, fontStyle: 'italic' }}>
              {L(systemRoles.find(r => r.key === selectedRole)?.hint)}
            </div>
          </div>

          {/* Permissions Matrix */}
          <div style={{ marginTop: 24, borderTop: '1px solid var(--cream)', paddingTop: 16 }}>
            <h3 className="serif" style={{ fontSize: '1.15rem', color: 'var(--forest)', marginBottom: 14 }}>
              {t('admin.roles.selectAccess')}
            </h3>

            {selectedRole === 'superadmin' ? (
              <div className="badge b-green" style={{ display: 'inline-block', padding: '12px 18px', fontSize: '.9rem', fontWeight: 600 }}>
                {t('admin.roles.allPages')} (Super Admin has root access to every single module)
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {NAV_PAGES.map((g) => (
                  <div key={g.group} style={{ background: 'var(--cream-2)', padding: 14, borderRadius: 10 }}>
                    <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 700, color: 'var(--muted)', marginBottom: 8 }}>
                      {t(`admin.sidebar.${g.group}`)}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {g.items.map((itemKey) => {
                        const isChecked = allowedForSelected.includes(itemKey);
                        return (
                          <label key={itemKey} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.88rem', cursor: 'pointer', color: 'var(--forest)', fontWeight: 500 }}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleTogglePermission(itemKey)}
                              style={{ accentColor: 'var(--gold)', width: 16, height: 16 }}
                            />
                            {t(`admin.sidebar.${itemKey}`)}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
            {customRoles.some((cr) => cr.key === selectedRole) && (
              <button className="btn btn-outline" type="button" style={{ borderColor: 'var(--red)', color: 'var(--red)' }} onClick={() => handleDeleteRole(selectedRole)}>
                {t('admin.roles.deleteBtn')}
              </button>
            )}
            {selectedRole !== 'superadmin' && (
              <button className="btn btn-gold" type="button" onClick={handleSavePermissions}>
                <Icon name="check" size={16} stroke={2.4} style={{ marginRight: 6 }} /> {t('admin.roles.saveBtn')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
