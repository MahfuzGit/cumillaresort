'use client';
import { useState, useEffect, useRef } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { villas, roomTypes, roomPattern, extraCharges, fmtTaka, getVillaImage, setVillaImage } from '../../../lib/data';

const STATUS_KEYS = ['occupied', 'arriving', 'vacant', 'maintenance'];
const OCC = { 'tea-garden-villa': 92, 'canopy-treehouse': 84, 'lake-cottage': 78, 'rainforest-pool-villa': 71, 'family-residence': 66, 'presidential-suite': 58 };

export default function RoomsPage() {
  const { t, n, L } = useLang();

  // Dynamic Villa & Cottage Images state
  const [villaImages, setVillaImages] = useState({});
  const [uploadingSlug, setUploadingSlug] = useState('');
  const fileInputRefs = useRef({});

  useEffect(() => {
    const initial = {};
    villas.forEach((v) => {
      initial[v.slug] = getVillaImage(v.slug, v.img);
    });
    setVillaImages(initial);
  }, []);

  const handleImageChange = (slug, newUrl) => {
    setVillaImages((prev) => ({ ...prev, [slug]: newUrl }));
    setVillaImage(slug, newUrl);
  };

  const handleFileUpload = async (slug, file) => {
    if (!file) return;
    setUploadingSlug(slug);
    try {
      // Try Cloudinary API first
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          handleImageChange(slug, data.url);
          setUploadingSlug('');
          return;
        }
      }
    } catch { /* fallback to local data URL */ }

    // Local Data URL fallback if API not configured
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleImageChange(slug, e.target.result);
      }
      setUploadingSlug('');
    };
    reader.readAsDataURL(file);
  };

  // Editable charge state (demo — resets on reload)
  const [rates, setRates] = useState(() => villas.map((v) => ({ base: v.price, weekend: Math.round(v.price * 1.15) })));
  const [extraAmts, setExtraAmts] = useState(() => extraCharges.map((x) => x.amount));

  const setRate = (i, field, val) =>
    setRates((prev) => prev.map((r, j) => (j === i ? { ...r, [field]: Math.max(0, Number(val) || 0) } : r)));
  const setExtraAmt = (i, val) =>
    setExtraAmts((prev) => prev.map((a, j) => (j === i ? Math.max(0, Number(val) || 0) : a)));

  // expand room list: [{no, type}]
  const roomList = [];
  roomTypes.forEach((rt) => {
    for (let i = 1; i <= rt.count; i++) roomList.push({ no: String(i).padStart(2, '0'), type: rt.label });
  });

  const RATE_INPUT = {
    width: 110, padding: '8px 10px', borderRadius: 8, border: '1.5px solid var(--cream)',
    fontSize: '.88rem', fontFamily: 'inherit', color: 'var(--ink)', background: '#fff',
  };

  return (
    <>
      <AdminTopbar title={t('admin.rooms.title')} sub={t('admin.rooms.sub')} />

      <div className="acard" style={{ marginBottom: 18 }}>
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.rooms.liveTitle')}</h2>
            <div className="hint">{t('admin.rooms.liveHint')}</div>
          </div>
          <div className="legend">
            <span><i style={{ background: 'var(--green)' }} />{t('admin.status.occupied')}</span>
            <span><i style={{ background: 'var(--gold)' }} />{t('admin.status.arriving')}</span>
            <span><i style={{ background: 'var(--muted)' }} />{t('admin.status.vacant')}</span>
            <span><i style={{ background: 'var(--red)' }} />{t('admin.status.maintenance')}</span>
          </div>
        </div>
        <div className="room-status-grid">
          {roomList.map((r, i) => (
            <div className="room-chip" key={i} onClick={() => alert(t('common.demoNote'))}>
              <div className="no">{n(r.no)}</div>
              <div className="type">{L(r.type)}</div>
              <StatusBadge status={STATUS_KEYS[roomPattern[i] ?? 2]} />
            </div>
          ))}
        </div>
      </div>

      {/* -------- VILLAS & COTTAGES PHOTO MANAGER -------- */}
      <div className="acard" style={{ marginBottom: 18, borderLeft: '4px solid var(--gold)' }}>
        <div className="card-head">
          <div>
            <h2 className="serif">Villas & Cottages Photo Management</h2>
            <div className="hint">Upload custom photos or change image URLs for each villa & cottage. Changes update live across the website.</div>
          </div>
          <button
            className="btn-admin"
            onClick={() => {
              try { localStorage.removeItem('cumilla-villa-images-v1'); } catch {}
              const resetMap = {};
              villas.forEach((v) => { resetMap[v.slug] = v.img; });
              setVillaImages(resetMap);
              window.dispatchEvent(new Event('storage'));
            }}
          >
            <Icon name="close" size={15} stroke={2} /> Reset Villa Photos
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
          {villas.map((v) => {
            const currentImg = villaImages[v.slug] || v.img;
            return (
              <div
                key={v.slug}
                style={{
                  border: '1.5px solid var(--cream)',
                  borderRadius: 14,
                  padding: 16,
                  background: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={currentImg}
                    alt={L(v.name)}
                    onError={() => handleImageChange(v.slug, v.img)}
                    style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10 }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      background: 'rgba(12, 43, 42, 0.85)',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: 20,
                      fontSize: '.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {L(v.name)}
                  </span>
                </div>


                <div className="field" style={{ margin: 0 }}>
                  <label htmlFor={`v-img-${v.slug}`} style={{ fontSize: '.78rem', fontWeight: 700 }}>
                    Image URL
                  </label>
                  <input
                    id={`v-img-${v.slug}`}
                    value={currentImg}
                    onChange={(e) => handleImageChange(v.slug, e.target.value)}
                    placeholder="https://..."
                    style={{ fontSize: '.84rem', padding: '8px 10px' }}
                  />
                </div>

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={(el) => (fileInputRefs.current[v.slug] = el)}
                    onChange={(e) => handleFileUpload(v.slug, e.target.files?.[0])}
                  />
                  <button
                    className="btn-admin"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '.84rem' }}
                    disabled={uploadingSlug === v.slug}
                    onClick={() => fileInputRefs.current[v.slug]?.click()}
                  >
                    <Icon name="plus" size={14} stroke={2.4} />
                    {uploadingSlug === v.slug ? 'Uploading…' : 'Upload New Photo'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.rooms.catTitle')}</h2>
            <div className="hint">{t('admin.rooms.catHint')}</div>
          </div>
        </div>
        <div className="cat-cards">
          {villas.map((v) => (
            <div className="rc" key={v.slug} onClick={() => alert(t('common.demoNote'))}>
              <img src={villaImages[v.slug] || v.img} alt={L(v.name)} loading="lazy" />
              <div className="body">
                <h3 className="serif">{L(v.name)}</h3>
                <div className="meta">
                  {n(v.units)} {t('admin.rooms.units')} · {n(v.size)} m² · {n(v.guests)} {t('common.guests')}
                </div>
                <div className="foot">
                  <span className="pr">{fmtTaka(v.price, n)} <small>{t('common.perNight')}</small></span>
                  <span className={`badge ${OCC[v.slug] >= 75 ? 'b-green' : 'b-amber'}`}>{n(OCC[v.slug])}% {t('admin.status.booked')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -------- ROOM CHARGE MANAGEMENT -------- */}
      <div className="acard" style={{ marginTop: 18, borderLeft: '4px solid var(--gold)' }}>
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.charges.title')}</h2>
            <div className="hint">{t('admin.charges.hint')}</div>
          </div>
          <button className="btn-admin no-print" onClick={() => alert(t('admin.charges.saved'))}>
            <Icon name="check" size={15} stroke={2.4} /> {t('admin.charges.save')}
          </button>
        </div>
        <div style={{ overflowX: 'auto', marginBottom: 22 }}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.finance.villaType')}</th>
                <th>{t('admin.rooms.units')}</th>
                <th>{t('admin.charges.baseRate')}</th>
                <th>{t('admin.charges.weekendRate')}</th>
              </tr>
            </thead>
            <tbody>
              {villas.map((v, i) => (
                <tr key={v.slug}>
                  <td><b>{L(v.name)}</b></td>
                  <td>{n(v.units)}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      ৳<input style={RATE_INPUT} type="number" value={rates[i].base} onChange={(e) => setRate(i, 'base', e.target.value)} />
                    </span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      ৳<input style={RATE_INPUT} type="number" value={rates[i].weekend} onChange={(e) => setRate(i, 'weekend', e.target.value)} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="serif" style={{ fontSize: '1.05rem', marginBottom: 4 }}>{t('admin.charges.extraTitle')}</h3>
        <div className="hint" style={{ marginBottom: 12 }}>{t('admin.charges.extraHint')}</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.charges.service')}</th>
                <th>{t('admin.charges.charge')}</th>
              </tr>
            </thead>
            <tbody>
              {extraCharges.map((x, i) => (
                <tr key={x.key}>
                  <td>{L(x.label)}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      ৳<input style={RATE_INPUT} type="number" value={extraAmts[i]} onChange={(e) => setExtraAmt(i, e.target.value)} />
                      <small style={{ color: 'var(--muted)' }}>{t(`admin.charges.${x.per}`)}</small>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

