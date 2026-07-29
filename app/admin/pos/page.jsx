'use client';
import { useState } from 'react';
import AdminTopbar from '../../../components/AdminTopbar';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { menuItems, initialFolios, adminGuests, fmtTaka } from '../../../lib/data';

const CATS = ['food', 'beverage', 'dessert'];

export default function PosPage() {
  const { t, n, L } = useLang();
  const [order, setOrder] = useState([]);       // [{menuIdx, qty}]
  const [target, setTarget] = useState('0');    // folio index or 'walkin'
  const [folios, setFolios] = useState(initialFolios);
  const [ordersToday, setOrdersToday] = useState(14);

  const orderTotal = order.reduce((a, o) => a + menuItems[o.menuIdx].price * o.qty, 0);
  const folioSum = (f) => f.charges.reduce((a, c) => a + c.amount, 0);
  const salesToday = 86400 + folios.reduce((a, f) => a + folioSum(f), 0);

  const addItem = (menuIdx) =>
    setOrder((prev) => {
      const hit = prev.find((o) => o.menuIdx === menuIdx);
      return hit
        ? prev.map((o) => (o.menuIdx === menuIdx ? { ...o, qty: o.qty + 1 } : o))
        : [...prev, { menuIdx, qty: 1 }];
    });

  const changeQty = (menuIdx, delta) =>
    setOrder((prev) => prev
      .map((o) => (o.menuIdx === menuIdx ? { ...o, qty: o.qty + delta } : o))
      .filter((o) => o.qty > 0));

  const finishOrder = (toRoom) => {
    if (!order.length) return;
    if (toRoom && target !== 'walkin') {
      const fi = Number(target);
      const bnQty = (q) => String(q).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);
      const newCharges = order.map((o) => {
        const m = menuItems[o.menuIdx];
        return {
          name: { en: `${m.name.en}${o.qty > 1 ? ` ×${o.qty}` : ''}`, bn: `${m.name.bn}${o.qty > 1 ? ` ×${bnQty(o.qty)}` : ''}` },
          amount: m.price * o.qty,
          time: '13:40',
        };
      });
      setFolios((prev) => prev.map((f, i) => (i === fi ? { ...f, charges: [...f.charges, ...newCharges] } : f)));
      alert(t('admin.pos.posted'));
    } else {
      alert(t('admin.pos.paidMsg'));
    }
    setOrder([]);
    setOrdersToday((c) => c + 1);
  };

  const kpis = [
    { label: t('admin.pos.todaySales'), val: fmtTaka(salesToday, n), icon: 'dining', bg: 'rgba(201,162,39,.14)', color: 'var(--gold)' },
    { label: t('admin.pos.orderCount'), val: n(ordersToday), icon: 'check', bg: 'rgba(30,142,90,.12)', color: 'var(--green)' },
    { label: t('admin.pos.openFolios'), val: n(folios.length), icon: 'home', bg: 'rgba(45,108,181,.12)', color: 'var(--blue)' },
  ];

  return (
    <>
      <AdminTopbar title={t('admin.pos.title')} sub={t('admin.pos.sub')} />

      <div className="kpis" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {kpis.map((k, i) => (
          <div className="kpi" key={i}>
            <div className="kpi-top">
              <span>{k.label}</span>
              <div className="kpi-ico" style={{ background: k.bg, color: k.color }}><Icon name={k.icon} size={19} /></div>
            </div>
            <div className="kpi-val" style={{ fontSize: '1.4rem' }}>{k.val}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: 'start', marginBottom: 18 }}>
        {/* -------- MENU -------- */}
        <div className="acard" style={{ marginBottom: 0 }}>
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.pos.menuTitle')}</h2>
              <div className="hint">{t('admin.pos.menuHint')}</div>
            </div>
          </div>
          {CATS.map((cat) => (
            <div key={cat} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '.75rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 9 }}>
                {t(`admin.pos.cats.${cat}`)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 9 }}>
                {menuItems.map((m, mi) => m.cat === cat && (
                  <button key={mi} className="no-print" onClick={() => addItem(mi)}
                    style={{ textAlign: 'left', padding: '11px 13px', borderRadius: 11, border: '1.5px solid var(--cream)', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color .15s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--cream)'; }}>
                    <div style={{ fontSize: '.84rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{L(m.name)}</div>
                    <div style={{ fontSize: '.8rem', color: 'var(--gold)', fontWeight: 700 }}>{fmtTaka(m.price, n)}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* -------- CURRENT ORDER -------- */}
        <div className="acard" style={{ marginBottom: 0, borderLeft: '4px solid var(--gold)', position: 'sticky', top: 16 }}>
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.pos.orderTitle')}</h2>
              <div className="hint">{t('admin.pos.orderHint')}</div>
            </div>
            {order.length > 0 && (
              <button className="text-link no-print" style={{ fontSize: '.8rem', color: 'var(--red)' }} onClick={() => setOrder([])}>
                {t('admin.pos.clearOrder')}
              </button>
            )}
          </div>

          <div className="field" style={{ marginBottom: 14 }}>
            <label htmlFor="pos-target">{t('admin.pos.selectGuest')}</label>
            <select id="pos-target" value={target} onChange={(e) => setTarget(e.target.value)}>
              {folios.map((f, i) => (
                <option key={i} value={i}>
                  {L(adminGuests[f.guestIdx].name)} — {L(adminGuests[f.guestIdx].villa)}
                </option>
              ))}
              <option value="walkin">{t('admin.pos.walkIn')}</option>
            </select>
          </div>

          {order.length === 0 ? (
            <div style={{ padding: '26px 0', textAlign: 'center', color: 'var(--muted)', fontSize: '.88rem' }}>
              {t('admin.pos.noOrder')}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 6 }}>
              <tbody>
                {order.map((o) => {
                  const m = menuItems[o.menuIdx];
                  return (
                    <tr key={o.menuIdx} style={{ borderTop: '1px solid var(--cream)' }}>
                      <td style={{ padding: '9px 0', fontSize: '.88rem' }}>{L(m.name)}</td>
                      <td style={{ padding: '9px 0', whiteSpace: 'nowrap' }}>
                        <span className="no-print" style={{ display: 'inline-flex', gap: 7, alignItems: 'center' }}>
                          <button onClick={() => changeQty(o.menuIdx, -1)} style={{ width: 22, height: 22, borderRadius: 6, border: '1.5px solid var(--cream)', background: '#fff', cursor: 'pointer', fontWeight: 800 }}>−</button>
                          <b>{n(o.qty)}</b>
                          <button onClick={() => changeQty(o.menuIdx, 1)} style={{ width: 22, height: 22, borderRadius: 6, border: '1.5px solid var(--cream)', background: '#fff', cursor: 'pointer', fontWeight: 800 }}>+</button>
                        </span>
                      </td>
                      <td style={{ padding: '9px 0', textAlign: 'right', fontWeight: 700 }}>{fmtTaka(m.price * o.qty, n)}</td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: '2px solid var(--forest)', background: 'var(--cream)' }}>
                  <td colSpan={2} style={{ padding: '11px 0', fontWeight: 800 }}>{t('admin.pos.orderTotal')}</td>
                  <td style={{ padding: '11px 0', textAlign: 'right', fontWeight: 800, color: 'var(--forest)', fontSize: '1.05rem' }}>{fmtTaka(orderTotal, n)}</td>
                </tr>
              </tbody>
            </table>
          )}

          <div className="no-print" style={{ display: 'flex', gap: 9, marginTop: 12 }}>
            <button className="btn-admin" disabled={!order.length || target === 'walkin'}
              style={{ flex: 1, justifyContent: 'center', background: 'var(--forest)', color: '#fff', opacity: (!order.length || target === 'walkin') ? 0.45 : 1, padding: '12px' }}
              onClick={() => finishOrder(true)}>
              <Icon name="home" size={15} stroke={2} /> {t('admin.pos.postRoom')}
            </button>
            <button className="btn-admin" disabled={!order.length}
              style={{ flex: 1, justifyContent: 'center', opacity: !order.length ? 0.45 : 1, padding: '12px' }}
              onClick={() => finishOrder(false)}>
              <Icon name="taka" size={15} stroke={2} /> {t('admin.pos.cashPay')}
            </button>
          </div>
        </div>
      </div>

      {/* -------- ROOM FOLIOS -------- */}
      <div className="acard">
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.pos.folioTitle')}</h2>
            <div className="hint">{t('admin.pos.folioHint')}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
          {folios.map((f, i) => {
            const g = adminGuests[f.guestIdx];
            return (
              <div key={i} style={{ border: '1.5px solid var(--cream)', borderRadius: 13, padding: 15 }}>
                <div style={{ display: 'flex', gap: 11, alignItems: 'center', marginBottom: 11 }}>
                  <img src={`https://i.pravatar.cc/96?img=${g.avatar}`} alt="" style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <strong style={{ fontSize: '.9rem' }}>{L(g.name)}</strong>
                    <span style={{ display: 'block', fontSize: '.75rem', color: 'var(--muted)' }}>{L(g.villa)}</span>
                  </div>
                </div>
                {f.charges.length === 0 ? (
                  <div style={{ fontSize: '.8rem', color: 'var(--muted)', padding: '6px 0 10px' }}>{t('admin.pos.noCharges')}</div>
                ) : (
                  f.charges.map((c, ci) => (
                    <div key={ci} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: '.8rem', padding: '5px 0', borderBottom: '1px dashed var(--cream)' }}>
                      <span>{L(c.name)} <small style={{ color: 'var(--muted)' }}>{n(c.time)}</small></span>
                      <b>{fmtTaka(c.amount, n)}</b>
                    </div>
                  ))
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontWeight: 800 }}>
                  <span style={{ fontSize: '.82rem' }}>{t('admin.pos.folioTotal')}</span>
                  <span style={{ color: 'var(--forest)' }}>{fmtTaka(folioSum(f), n)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
