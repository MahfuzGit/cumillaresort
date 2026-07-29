'use client';
import { useEffect, useRef, useState } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { useCms } from '../../../lib/cms';

const NAV_KEYS = ['villas', 'experiences', 'dining', 'gallery', 'availability', 'events', 'explore', 'offers', 'about', 'faq', 'contact', 'myBooking'];
const SECTION_KEYS = ['stats', 'about', 'villas', 'experiences', 'custom', 'gallery', 'testimonials', 'cta'];
const HERO_FIELDS = ['eyebrow', 'title1', 'titleEm', 'title2', 'sub'];

async function uploadToStorage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Upload failed');
  }

  const data = await res.json();
  return data.url;
}

export default function CmsPage() {
  const { t } = useLang();
  const {
    cms,
    setHeroField,
    setHeroImg,
    setHeroVideo,
    setSectionField,
    setSectionImage,
    toggleNav,
    toggleSection,
    addCustom,
    updateCustom,
    removeCustom,
    reset
  } = useCms();

  const [activeTab, setActiveTab] = useState('sections'); // 'sections' | 'media'
  const [mediaAssets, setMediaAssets] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaFilter, setMediaFilter] = useState('all'); // 'all' | 'image' | 'video'
  const [pickerTarget, setPickerTarget] = useState(null); // { type: 'heroImg' | 'heroVideo' | 'sanctuary1' | 'sanctuary2' | 'ctaImg' | 'ctaVideo' | 'custom', customId?: number }
  const [copiedUrl, setCopiedUrl] = useState('');

  const heroFileRef = useRef(null);
  const heroVideoFileRef = useRef(null);
  const sanctuaryImg1Ref = useRef(null);
  const sanctuaryImg2Ref = useRef(null);
  const ctaImgRef = useRef(null);
  const ctaVideoRef = useRef(null);

  const [heroUploading, setHeroUploading] = useState(false);
  const [videoUploading, setVideoUploading] = useState(false);
  const [sanc1Uploading, setSanc1Uploading] = useState(false);
  const [sanc2Uploading, setSanc2Uploading] = useState(false);
  const [ctaUploading, setCtaUploading] = useState(false);
  const [ctaVideoUploading, setCtaVideoUploading] = useState(false);

  const [uploadError, setUploadError] = useState('');
  const [videoError, setVideoError] = useState('');

  // Fetch Media Assets Records from PostgreSQL
  const fetchMediaAssets = async () => {
    setMediaLoading(true);
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setMediaAssets(data || []);
      }
    } catch (err) {
      console.error('Error fetching media assets:', err);
    }
    setMediaLoading(false);
  };

  useEffect(() => {
    fetchMediaAssets();
  }, []);

  const handleHeroUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setHeroUploading(true);
    setUploadError('');
    try {
      const url = await uploadToStorage(file);
      setHeroImg(url);
      fetchMediaAssets();
    } catch (err) {
      setUploadError(err.message || 'Upload failed. Check your Supabase storage bucket.');
    }
    setHeroUploading(false);
    e.target.value = '';
  };

  const handleHeroVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoUploading(true);
    setVideoError('');
    try {
      const url = await uploadToStorage(file);
      setHeroVideo(url);
      fetchMediaAssets();
    } catch (err) {
      setVideoError(err.message || 'Video upload failed. Ensure bucket allows MP4 files.');
    }
    setVideoUploading(false);
    e.target.value = '';
  };

  const handleSanctuaryUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (field === 'img1') setSanc1Uploading(true);
    else setSanc2Uploading(true);
    try {
      const url = await uploadToStorage(file);
      setSectionImage('sanctuary', field, url);
      fetchMediaAssets();
    } catch (err) {
      alert(err.message || 'Image upload failed');
    }
    if (field === 'img1') setSanc1Uploading(false);
    else setSanc2Uploading(false);
    e.target.value = '';
  };

  const handleCtaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCtaUploading(true);
    try {
      const url = await uploadToStorage(file);
      setSectionImage('ctaSec', 'img', url);
      fetchMediaAssets();
    } catch (err) {
      alert(err.message || 'Image upload failed');
    }
    setCtaUploading(false);
    e.target.value = '';
  };

  const handleCtaVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCtaVideoUploading(true);
    try {
      const url = await uploadToStorage(file);
      setSectionImage('ctaSec', 'video', url);
      fetchMediaAssets();
    } catch (err) {
      alert(err.message || 'CTA video upload failed');
    }
    setCtaVideoUploading(false);
    e.target.value = '';
  };

  const applyMediaToTarget = (url) => {
    if (!pickerTarget) return;
    const { type, customId } = pickerTarget;
    if (type === 'heroImg') setHeroImg(url);
    else if (type === 'heroVideo') setHeroVideo(url);
    else if (type === 'sanctuary1') setSectionImage('sanctuary', 'img1', url);
    else if (type === 'sanctuary2') setSectionImage('sanctuary', 'img2', url);
    else if (type === 'ctaImg') setSectionImage('ctaSec', 'img', url);
    else if (type === 'ctaVideo') setSectionImage('ctaSec', 'video', url);
    else if (type === 'custom' && customId) updateCustom(customId, { img: url });
    setPickerTarget(null);
  };

  const deleteMediaAsset = async (id) => {
    if (!confirm('Are you sure you want to delete this media record?')) return;
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMediaAssets((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      alert('Failed to delete media record');
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2000);
  };

  const addBlank = () => addCustom({
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/sylhet_tea_garden_hero.png',
    title: { en: t('admin.cms.newSecTitleEn'), bn: t('admin.cms.newSecTitleBn') },
    desc: { en: t('admin.cms.newSecDescEn'), bn: t('admin.cms.newSecDescBn') },
  });

  const filteredAssets = mediaAssets.filter((a) => mediaFilter === 'all' || a.file_type === mediaFilter);

  return (
    <>
      <AdminTopbar title={t('admin.cms.title')} sub={t('admin.cms.sub')} />

      {/* Top Banner Nav & Controls */}
      <div className="acard" style={{ marginBottom: 18, borderLeft: '4px solid var(--gold)', display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 10, flex: 1, minWidth: 260 }}>
          <button
            className={`btn-admin${activeTab === 'sections' ? ' primary' : ''}`}
            onClick={() => setActiveTab('sections')}
            style={{ background: activeTab === 'sections' ? 'var(--forest)' : undefined, color: activeTab === 'sections' ? '#fff' : undefined }}
          >
            <Icon name="grid" size={15} /> Page Sections
          </button>

          <button
            className={`btn-admin${activeTab === 'media' ? ' primary' : ''}`}
            onClick={() => { setActiveTab('media'); fetchMediaAssets(); }}
            style={{ background: activeTab === 'media' ? 'var(--forest)' : undefined, color: activeTab === 'media' ? '#fff' : undefined }}
          >
            <Icon name="image" size={15} /> Media Assets Library ({mediaAssets.length})
          </button>
        </div>

        <a className="btn-admin" href="/" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
          <Icon name="arrowRight" size={15} stroke={2} /> {t('admin.cms.viewSite')}
        </a>
        <button className="btn-admin" onClick={reset}>
          <Icon name="close" size={15} stroke={2} /> {t('admin.cms.reset')}
        </button>
      </div>

      {/* ==================== TAB 2: MEDIA ASSETS LIBRARY ==================== */}
      {activeTab === 'media' && (
        <div className="acard">
          <div className="card-head">
            <div>
              <h2 className="serif">Media Assets Library & Records</h2>
              <div className="hint">All uploaded photos and videos tracked in PostgreSQL database (`public.cms_media_assets`)</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn-admin"
                onClick={() => setMediaFilter('all')}
                style={{ opacity: mediaFilter === 'all' ? 1 : 0.6, fontWeight: mediaFilter === 'all' ? 700 : 400 }}
              >
                All ({mediaAssets.length})
              </button>
              <button
                className="btn-admin"
                onClick={() => setMediaFilter('image')}
                style={{ opacity: mediaFilter === 'image' ? 1 : 0.6, fontWeight: mediaFilter === 'image' ? 700 : 400 }}
              >
                Photos ({mediaAssets.filter(a => a.file_type === 'image').length})
              </button>
              <button
                className="btn-admin"
                onClick={() => setMediaFilter('video')}
                style={{ opacity: mediaFilter === 'video' ? 1 : 0.6, fontWeight: mediaFilter === 'video' ? 700 : 400 }}
              >
                Videos ({mediaAssets.filter(a => a.file_type === 'video').length})
              </button>
            </div>
          </div>

          {mediaLoading ? (
            <p style={{ textAlign: 'center', padding: 40 }}>Loading media asset records from database…</p>
          ) : filteredAssets.length === 0 ? (
            <p style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>No media assets recorded yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {filteredAssets.map((asset) => (
                <div key={asset.id} style={{ border: '1.5px solid var(--cream)', borderRadius: 12, overflow: 'hidden', padding: 10, background: '#faf8f5', display: 'flex', flexDirection: 'column' }}>
                  {asset.file_type === 'video' ? (
                    <video src={asset.file_url} controls style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 8, background: '#000' }} />
                  ) : (
                    <img src={asset.file_url} alt="" style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 8 }} />
                  )}
                  <div style={{ marginTop: 8, flex: 1, display: 'flex', flexDirection: 'column', justifyBetween: 'space-between' }}>
                    <div style={{ fontSize: '.8rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={asset.file_name}>
                      {asset.file_name}
                    </div>
                    <div style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: 2, marginBottom: 8 }}>
                      Tag: <span style={{ color: 'var(--forest)', fontWeight: 600 }}>{asset.section_tag || 'general'}</span>
                    </div>

                    <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                      <button
                        className="btn-admin"
                        onClick={() => copyToClipboard(asset.file_url)}
                        style={{ flex: 1, justifyContent: 'center', fontSize: '.75rem', padding: '4px 8px' }}
                      >
                        {copiedUrl === asset.file_url ? 'Copied!' : 'Copy URL'}
                      </button>
                      <button
                        className="btn-admin"
                        onClick={() => deleteMediaAsset(asset.id)}
                        style={{ color: 'var(--red)', fontSize: '.75rem', padding: '4px 8px' }}
                        title="Delete asset record"
                      >
                        <Icon name="close" size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB 1: PAGE SECTIONS ==================== */}
      {activeTab === 'sections' && (
        <>
          {/* -------- HERO EDITOR -------- */}
          <div className="acard" style={{ marginBottom: 18 }}>
            <div className="card-head">
              <div>
                <h2 className="serif">{t('admin.cms.heroTitle')}</h2>
                <div className="hint">{t('admin.cms.heroHint')}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* HERO IMAGE */}
                <div>
                  <label style={{ fontSize: '.8rem', fontWeight: 700, display: 'block', marginBottom: 6 }}>Hero Static Image</label>
                  <img src={cms.hero.img} alt="" style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />
                  <div className="field" style={{ margin: 0 }}>
                    <label htmlFor="hero-img">{t('admin.cms.imgUrl')}</label>
                    <input id="hero-img" value={cms.hero.img} onChange={(e) => setHeroImg(e.target.value)} />
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <input ref={heroFileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleHeroUpload} />
                    <button className="btn-admin" onClick={() => heroFileRef.current?.click()} disabled={heroUploading} style={{ width: '100%', justifyContent: 'center' }}>
                      <Icon name="plus" size={14} /> {heroUploading ? 'Uploading…' : 'Upload Hero Image'}
                    </button>
                    <button className="btn-admin" onClick={() => setPickerTarget({ type: 'heroImg' })} style={{ width: '100%', justifyContent: 'center', background: '#f0ece3' }}>
                      <Icon name="image" size={14} /> Choose from Library
                    </button>
                    {uploadError && <p style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: 4 }}>{uploadError}</p>}
                  </div>
                </div>

                {/* HERO VIDEO */}
                <div style={{ paddingTop: 12, borderTop: '1.5px solid var(--cream)' }}>
                  <label style={{ fontSize: '.8rem', fontWeight: 700, display: 'block', marginBottom: 6 }}>Hero Background Video</label>
                  {cms.hero.video ? (
                    <video src={cms.hero.video} autoPlay muted loop playsInline style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 10, marginBottom: 8, background: '#000' }} />
                  ) : null}
                  <div className="field" style={{ margin: 0 }}>
                    <label htmlFor="hero-video">Video URL (MP4 / WebM)</label>
                    <input id="hero-video" value={cms.hero.video || ''} onChange={(e) => setHeroVideo(e.target.value)} placeholder="https://..." />
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <input ref={heroVideoFileRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={handleHeroVideoUpload} />
                    <button className="btn-admin" onClick={() => heroVideoFileRef.current?.click()} disabled={videoUploading} style={{ width: '100%', justifyContent: 'center' }}>
                      <Icon name="plus" size={14} /> {videoUploading ? 'Uploading Video…' : 'Upload Hero Video'}
                    </button>
                    <button className="btn-admin" onClick={() => setPickerTarget({ type: 'heroVideo' })} style={{ width: '100%', justifyContent: 'center', background: '#f0ece3' }}>
                      <Icon name="image" size={14} /> Choose from Library
                    </button>
                    {videoError && <p style={{ color: 'var(--red)', fontSize: '.78rem', marginTop: 4 }}>{videoError}</p>}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {HERO_FIELDS.map((f) => (
                  <div key={f} style={{ gridColumn: f === 'sub' ? '1 / -1' : undefined, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div className="field" style={{ margin: 0 }}>
                      <label htmlFor={`hero-${f}-en`}>{t(`admin.cms.${f === 'eyebrow' ? 'eyebrow' : f === 'title1' ? 'titlePart1' : f === 'titleEm' ? 'titleEm' : f === 'title2' ? 'titlePart2' : 'subText'}`)} — EN</label>
                      {f === 'sub'
                        ? <textarea id={`hero-${f}-en`} value={cms.hero[f].en} onChange={(e) => setHeroField(f, 'en', e.target.value)} style={{ minHeight: 70 }} />
                        : <input id={`hero-${f}-en`} value={cms.hero[f].en} onChange={(e) => setHeroField(f, 'en', e.target.value)} />}
                    </div>
                    <div className="field" style={{ margin: 0 }}>
                      <label htmlFor={`hero-${f}-bn`}>{t(`admin.cms.${f === 'eyebrow' ? 'eyebrow' : f === 'title1' ? 'titlePart1' : f === 'titleEm' ? 'titleEm' : f === 'title2' ? 'titlePart2' : 'subText'}`)} — BN</label>
                      {f === 'sub'
                        ? <textarea id={`hero-${f}-bn`} value={cms.hero[f].bn} onChange={(e) => setHeroField(f, 'bn', e.target.value)} style={{ minHeight: 70 }} />
                        : <input id={`hero-${f}-bn`} value={cms.hero[f].bn} onChange={(e) => setHeroField(f, 'bn', e.target.value)} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* -------- 1. OUR SANCTUARY (ABOUT SECTION) -------- */}
          <div className="acard" style={{ marginBottom: 18 }}>
            <div className="card-head">
              <div>
                <h2 className="serif">1. Our Sanctuary (About Section)</h2>
                <div className="hint">Customize heading, story description & feature collage photos</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Image 1 */}
                <div>
                  <label style={{ fontSize: '.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Collage Photo 1</label>
                  <img src={cms.sanctuary.img1} alt="" style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 8, marginBottom: 6 }} />
                  <input value={cms.sanctuary.img1} onChange={(e) => setSectionImage('sanctuary', 'img1', e.target.value)} style={{ fontSize: '.82rem', marginBottom: 6 }} />
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input ref={sanctuaryImg1Ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleSanctuaryUpload(e, 'img1')} />
                    <button className="btn-admin" onClick={() => sanctuaryImg1Ref.current?.click()} disabled={sanc1Uploading} style={{ flex: 1, justifyContent: 'center' }}>
                      {sanc1Uploading ? 'Uploading…' : 'Upload'}
                    </button>
                    <button className="btn-admin" onClick={() => setPickerTarget({ type: 'sanctuary1' })} style={{ flex: 1, justifyContent: 'center', background: '#f0ece3' }}>
                      Library
                    </button>
                  </div>
                </div>

                {/* Image 2 */}
                <div style={{ paddingTop: 10, borderTop: '1px solid var(--cream)' }}>
                  <label style={{ fontSize: '.8rem', fontWeight: 700, display: 'block', marginBottom: 4 }}>Collage Photo 2</label>
                  <img src={cms.sanctuary.img2} alt="" style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 8, marginBottom: 6 }} />
                  <input value={cms.sanctuary.img2} onChange={(e) => setSectionImage('sanctuary', 'img2', e.target.value)} style={{ fontSize: '.82rem', marginBottom: 6 }} />
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input ref={sanctuaryImg2Ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleSanctuaryUpload(e, 'img2')} />
                    <button className="btn-admin" onClick={() => sanctuaryImg2Ref.current?.click()} disabled={sanc2Uploading} style={{ flex: 1, justifyContent: 'center' }}>
                      {sanc2Uploading ? 'Uploading…' : 'Upload'}
                    </button>
                    <button className="btn-admin" onClick={() => setPickerTarget({ type: 'sanctuary2' })} style={{ flex: 1, justifyContent: 'center', background: '#f0ece3' }}>
                      Library
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="field" style={{ margin: 0 }}>
                  <label>Eyebrow (EN)</label>
                  <input value={cms.sanctuary.eyebrow.en} onChange={(e) => setSectionField('sanctuary', 'eyebrow', 'en', e.target.value)} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>Eyebrow (BN)</label>
                  <input value={cms.sanctuary.eyebrow.bn} onChange={(e) => setSectionField('sanctuary', 'eyebrow', 'bn', e.target.value)} />
                </div>

                <div className="field" style={{ margin: 0 }}>
                  <label>Title Part 1 (EN)</label>
                  <input value={cms.sanctuary.title1.en} onChange={(e) => setSectionField('sanctuary', 'title1', 'en', e.target.value)} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>Title Part 1 (BN)</label>
                  <input value={cms.sanctuary.title1.bn} onChange={(e) => setSectionField('sanctuary', 'title1', 'bn', e.target.value)} />
                </div>

                <div className="field" style={{ margin: 0 }}>
                  <label>Title Emphasis (EN)</label>
                  <input value={cms.sanctuary.titleEm.en} onChange={(e) => setSectionField('sanctuary', 'titleEm', 'en', e.target.value)} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>Title Emphasis (BN)</label>
                  <input value={cms.sanctuary.titleEm.bn} onChange={(e) => setSectionField('sanctuary', 'titleEm', 'bn', e.target.value)} />
                </div>

                <div className="field" style={{ margin: 0, gridColumn: '1 / -1' }}>
                  <label>Story Description (EN)</label>
                  <textarea value={cms.sanctuary.lead.en} onChange={(e) => setSectionField('sanctuary', 'lead', 'en', e.target.value)} style={{ minHeight: 65 }} />
                </div>
                <div className="field" style={{ margin: 0, gridColumn: '1 / -1' }}>
                  <label>Story Description (BN)</label>
                  <textarea value={cms.sanctuary.lead.bn} onChange={(e) => setSectionField('sanctuary', 'lead', 'bn', e.target.value)} style={{ minHeight: 65 }} />
                </div>
              </div>
            </div>
          </div>

          {/* -------- 2. STAY WITH US (VILLAS SECTION) -------- */}
          <div className="acard" style={{ marginBottom: 18 }}>
            <div className="card-head">
              <div>
                <h2 className="serif">2. Stay With Us (Villas Showcase)</h2>
                <div className="hint">Customize heading and introductory description for villa collection</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field" style={{ margin: 0 }}>
                <label>Eyebrow (EN)</label>
                <input value={cms.villasSec.eyebrow.en} onChange={(e) => setSectionField('villasSec', 'eyebrow', 'en', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Eyebrow (BN)</label>
                <input value={cms.villasSec.eyebrow.bn} onChange={(e) => setSectionField('villasSec', 'eyebrow', 'bn', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Title (EN)</label>
                <input value={cms.villasSec.title1.en} onChange={(e) => setSectionField('villasSec', 'title1', 'en', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Title (BN)</label>
                <input value={cms.villasSec.title1.bn} onChange={(e) => setSectionField('villasSec', 'title1', 'bn', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0, gridColumn: '1 / -1' }}>
                <label>Introductory Description (EN)</label>
                <textarea value={cms.villasSec.lead.en} onChange={(e) => setSectionField('villasSec', 'lead', 'en', e.target.value)} style={{ minHeight: 60 }} />
              </div>
              <div className="field" style={{ margin: 0, gridColumn: '1 / -1' }}>
                <label>Introductory Description (BN)</label>
                <textarea value={cms.villasSec.lead.bn} onChange={(e) => setSectionField('villasSec', 'lead', 'bn', e.target.value)} style={{ minHeight: 60 }} />
              </div>
            </div>
          </div>

          {/* -------- 3. BEYOND THE ROOM (EXPERIENCES) -------- */}
          <div className="acard" style={{ marginBottom: 18 }}>
            <div className="card-head">
              <div>
                <h2 className="serif">3. Beyond the Room (Experiences)</h2>
                <div className="hint">Customize heading for resort activities & dining experiences</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field" style={{ margin: 0 }}>
                <label>Eyebrow (EN)</label>
                <input value={cms.experiencesSec.eyebrow.en} onChange={(e) => setSectionField('experiencesSec', 'eyebrow', 'en', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Eyebrow (BN)</label>
                <input value={cms.experiencesSec.eyebrow.bn} onChange={(e) => setSectionField('experiencesSec', 'eyebrow', 'bn', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Title (EN)</label>
                <input value={cms.experiencesSec.title1.en} onChange={(e) => setSectionField('experiencesSec', 'title1', 'en', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Title (BN)</label>
                <input value={cms.experiencesSec.title1.bn} onChange={(e) => setSectionField('experiencesSec', 'title1', 'bn', e.target.value)} />
              </div>
            </div>
          </div>

          {/* -------- 4. THE GALLERY -------- */}
          <div className="acard" style={{ marginBottom: 18 }}>
            <div className="card-head">
              <div>
                <h2 className="serif">4. The Gallery (Marquee Showcase)</h2>
                <div className="hint">Customize heading & lead for the photo gallery marquee</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field" style={{ margin: 0 }}>
                <label>Eyebrow (EN)</label>
                <input value={cms.gallerySec.eyebrow.en} onChange={(e) => setSectionField('gallerySec', 'eyebrow', 'en', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Eyebrow (BN)</label>
                <input value={cms.gallerySec.eyebrow.bn} onChange={(e) => setSectionField('gallerySec', 'eyebrow', 'bn', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Title (EN)</label>
                <input value={cms.gallerySec.title1.en} onChange={(e) => setSectionField('gallerySec', 'title1', 'en', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Title (BN)</label>
                <input value={cms.gallerySec.title1.bn} onChange={(e) => setSectionField('gallerySec', 'title1', 'bn', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0, gridColumn: '1 / -1' }}>
                <label>Gallery Lead Text (EN)</label>
                <textarea value={cms.gallerySec.lead.en} onChange={(e) => setSectionField('gallerySec', 'lead', 'en', e.target.value)} style={{ minHeight: 60 }} />
              </div>
              <div className="field" style={{ margin: 0, gridColumn: '1 / -1' }}>
                <label>Gallery Lead Text (BN)</label>
                <textarea value={cms.gallerySec.lead.bn} onChange={(e) => setSectionField('gallerySec', 'lead', 'bn', e.target.value)} style={{ minHeight: 60 }} />
              </div>
            </div>
          </div>

          {/* -------- 5. GUEST STORIES (TESTIMONIALS) -------- */}
          <div className="acard" style={{ marginBottom: 18 }}>
            <div className="card-head">
              <div>
                <h2 className="serif">5. Guest Stories (Reviews)</h2>
                <div className="hint">Customize heading for guest reviews section</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="field" style={{ margin: 0 }}>
                <label>Eyebrow (EN)</label>
                <input value={cms.testimonialsSec.eyebrow.en} onChange={(e) => setSectionField('testimonialsSec', 'eyebrow', 'en', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Eyebrow (BN)</label>
                <input value={cms.testimonialsSec.eyebrow.bn} onChange={(e) => setSectionField('testimonialsSec', 'eyebrow', 'bn', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Title (EN)</label>
                <input value={cms.testimonialsSec.title1.en} onChange={(e) => setSectionField('testimonialsSec', 'title1', 'en', e.target.value)} />
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Title (BN)</label>
                <input value={cms.testimonialsSec.title1.bn} onChange={(e) => setSectionField('testimonialsSec', 'title1', 'bn', e.target.value)} />
              </div>
            </div>
          </div>

          {/* -------- 6. BEGIN YOUR JOURNEY (CTA BANNER) -------- */}
          <div className="acard" style={{ marginBottom: 18 }}>
            <div className="card-head">
              <div>
                <h2 className="serif">6. Begin Your Journey (CTA Banner)</h2>
                <div className="hint">Customize call-to-action title, subtitle, background photo & background video</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* CTA IMAGE */}
                <div>
                  <label style={{ fontSize: '.8rem', fontWeight: 700, display: 'block', marginBottom: 6 }}>CTA Background Image</label>
                  <img src={cms.ctaSec.img} alt="" style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />
                  <input value={cms.ctaSec.img} onChange={(e) => setSectionImage('ctaSec', 'img', e.target.value)} style={{ fontSize: '.82rem', marginBottom: 8 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <input ref={ctaImgRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCtaUpload} />
                    <button className="btn-admin" onClick={() => ctaImgRef.current?.click()} disabled={ctaUploading} style={{ width: '100%', justifyContent: 'center' }}>
                      <Icon name="plus" size={14} /> {ctaUploading ? 'Uploading…' : 'Upload CTA Image'}
                    </button>
                    <button className="btn-admin" onClick={() => setPickerTarget({ type: 'ctaImg' })} style={{ width: '100%', justifyContent: 'center', background: '#f0ece3' }}>
                      <Icon name="image" size={14} /> Choose from Library
                    </button>
                  </div>
                </div>

                {/* CTA VIDEO */}
                <div style={{ paddingTop: 12, borderTop: '1.5px solid var(--cream)' }}>
                  <label style={{ fontSize: '.8rem', fontWeight: 700, display: 'block', marginBottom: 6 }}>CTA Background Video (Optional)</label>
                  {cms.ctaSec.video ? (
                    <video src={cms.ctaSec.video} autoPlay muted loop playsInline style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 10, marginBottom: 8, background: '#000' }} />
                  ) : null}
                  <input value={cms.ctaSec.video || ''} onChange={(e) => setSectionImage('ctaSec', 'video', e.target.value)} placeholder="https://...mp4" style={{ fontSize: '.82rem', marginBottom: 8 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <input ref={ctaVideoRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={handleCtaVideoUpload} />
                    <button className="btn-admin" onClick={() => ctaVideoRef.current?.click()} disabled={ctaVideoUploading} style={{ width: '100%', justifyContent: 'center' }}>
                      <Icon name="plus" size={14} /> {ctaVideoUploading ? 'Uploading Video…' : 'Upload CTA Video'}
                    </button>
                    <button className="btn-admin" onClick={() => setPickerTarget({ type: 'ctaVideo' })} style={{ width: '100%', justifyContent: 'center', background: '#f0ece3' }}>
                      <Icon name="image" size={14} /> Choose from Library
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="field" style={{ margin: 0 }}>
                  <label>CTA Title (EN)</label>
                  <input value={cms.ctaSec.title.en} onChange={(e) => setSectionField('ctaSec', 'title', 'en', e.target.value)} />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label>CTA Title (BN)</label>
                  <input value={cms.ctaSec.title.bn} onChange={(e) => setSectionField('ctaSec', 'title', 'bn', e.target.value)} />
                </div>
                <div className="field" style={{ margin: 0, gridColumn: '1 / -1' }}>
                  <label>CTA Subtitle (EN)</label>
                  <textarea value={cms.ctaSec.sub.en} onChange={(e) => setSectionField('ctaSec', 'sub', 'en', e.target.value)} style={{ minHeight: 65 }} />
                </div>
                <div className="field" style={{ margin: 0, gridColumn: '1 / -1' }}>
                  <label>CTA Subtitle (BN)</label>
                  <textarea value={cms.ctaSec.sub.bn} onChange={(e) => setSectionField('ctaSec', 'sub', 'bn', e.target.value)} style={{ minHeight: 65 }} />
                </div>
              </div>
            </div>
          </div>

          {/* -------- MENU + SECTION TOGGLES -------- */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
            <div className="acard" style={{ marginBottom: 0 }}>
              <div className="card-head">
                <div>
                  <h2 className="serif">{t('admin.cms.navTitle')}</h2>
                  <div className="hint">{t('admin.cms.navHint')}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
                {NAV_KEYS.map((k) => (
                  <label key={k} className="check" style={{ fontSize: '.84rem' }}>
                    <input type="checkbox" checked={!!cms.nav[k]} onChange={() => toggleNav(k)} />
                    <span>{k}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="acard" style={{ marginBottom: 0 }}>
              <div className="card-head">
                <div>
                  <h2 className="serif">{t('admin.cms.secTitle')}</h2>
                  <div className="hint">{t('admin.cms.secHint')}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
                {SECTION_KEYS.map((k) => (
                  <label key={k} className="check" style={{ fontSize: '.84rem' }}>
                    <input type="checkbox" checked={!!cms.sections[k]} onChange={() => toggleSection(k)} />
                    <span>{k}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* -------- CUSTOM SECTIONS -------- */}
          <div className="acard">
            <div className="card-head">
              <div>
                <h2 className="serif">{t('admin.cms.customTitle')}</h2>
                <div className="hint">{t('admin.cms.customHint')}</div>
              </div>
              <button className="btn-admin" onClick={addBlank}>
                <Icon name="plus" size={15} stroke={2.4} /> {t('admin.cms.addSection')}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {cms.custom.map((c) => (
                <div key={c.id} style={{ border: '1.5px solid var(--cream)', borderRadius: 14, padding: 18, opacity: c.visible ? 1 : 0.55 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 18, alignItems: 'start' }}>
                    <div>
                      <img src={c.img} alt="" style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }} />
                      <div className="field" style={{ margin: 0 }}>
                        <label htmlFor={`cs-img-${c.id}`}>{t('admin.cms.imgUrl')}</label>
                        <input id={`cs-img-${c.id}`} value={c.img} onChange={(e) => updateCustom(c.id, { img: e.target.value })} />
                      </div>
                      <button
                        className="btn-admin"
                        onClick={() => setPickerTarget({ type: 'custom', customId: c.id })}
                        style={{ width: '100%', justifyContent: 'center', marginTop: 8, background: '#f0ece3' }}
                      >
                        <Icon name="image" size={14} /> Choose from Library
                      </button>
                    </div>
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                        <div className="field" style={{ margin: 0 }}>
                          <label htmlFor={`cs-ten-${c.id}`}>{t('admin.cms.secTitle')} — EN</label>
                          <input id={`cs-ten-${c.id}`} value={c.title.en} onChange={(e) => updateCustom(c.id, { title: { ...c.title, en: e.target.value } })} />
                        </div>
                        <div className="field" style={{ margin: 0 }}>
                          <label htmlFor={`cs-tbn-${c.id}`}>{t('admin.cms.secTitle')} — BN</label>
                          <input id={`cs-tbn-${c.id}`} value={c.title.bn} onChange={(e) => updateCustom(c.id, { title: { ...c.title, bn: e.target.value } })} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div className="field" style={{ margin: 0 }}>
                          <label htmlFor={`cs-den-${c.id}`}>{t('admin.cms.secDesc')} — EN</label>
                          <textarea id={`cs-den-${c.id}`} value={c.desc.en} onChange={(e) => updateCustom(c.id, { desc: { ...c.desc, en: e.target.value } })} style={{ minHeight: 88 }} />
                        </div>
                        <div className="field" style={{ margin: 0 }}>
                          <label htmlFor={`cs-dbn-${c.id}`}>{t('admin.cms.secDesc')} — BN</label>
                          <textarea id={`cs-dbn-${c.id}`} value={c.desc.bn} onChange={(e) => updateCustom(c.id, { desc: { ...c.desc, bn: e.target.value } })} style={{ minHeight: 88 }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 14 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: '.85rem', fontWeight: 600 }}>
                          <button className={`switch${c.visible ? ' on' : ''}`} onClick={() => updateCustom(c.id, { visible: !c.visible })}
                            role="switch" aria-checked={c.visible} aria-label={t('admin.cms.visible')} />
                          {t('admin.cms.visible')}
                        </label>
                        <button className="text-link" style={{ color: 'var(--red)', fontSize: '.82rem' }} onClick={() => removeCustom(c.id)}>
                          <Icon name="close" size={13} stroke={2.4} /> {t('admin.cms.removeSection')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ==================== MEDIA LIBRARY SELECTOR MODAL ==================== */}
      {pickerTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 850, maxHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1.5px solid var(--cream)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 className="serif" style={{ margin: 0, fontSize: '1.25rem' }}>Select Asset from Media Library</h3>
                <p style={{ margin: 0, fontSize: '.8rem', color: 'var(--muted)' }}>Choose any photo or video record stored in database</p>
              </div>
              <button className="btn-admin" onClick={() => setPickerTarget(null)} style={{ padding: '4px 8px' }}>
                <Icon name="close" size={16} />
              </button>
            </div>

            <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
              {mediaAssets.length === 0 ? (
                <p style={{ textAlign: 'center', padding: 40 }}>No media records found in database.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
                  {mediaAssets.map((asset) => (
                    <div
                      key={asset.id}
                      onClick={() => applyMediaToTarget(asset.file_url)}
                      style={{ border: '1.5px solid var(--cream)', borderRadius: 10, padding: 8, cursor: 'pointer', background: '#faf8f5', transition: 'transform 0.15s, border-color 0.15s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      {asset.file_type === 'video' ? (
                        <video src={asset.file_url} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6, background: '#000' }} />
                      ) : (
                        <img src={asset.file_url} alt="" style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6 }} />
                      )}
                      <div style={{ fontSize: '.76rem', fontWeight: 600, marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={asset.file_name}>
                        {asset.file_name}
                      </div>
                      <button className="btn-admin" style={{ width: '100%', justifyContent: 'center', marginTop: 6, fontSize: '.72rem', padding: '3px 0' }}>
                        Select Asset
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
