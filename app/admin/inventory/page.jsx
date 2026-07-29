'use client';
import AdminTopbar from '../../../components/AdminTopbar';
import StatusBadge from '../../../components/StatusBadge';
import Icon from '../../../components/Icons';
import { useLang } from '../../../lib/i18n';
import { inventoryItems, suppliers, purchaseOrders, fmtTaka } from '../../../lib/data';

const CAT_COLOR = {
  kitchen: 'b-amber', housekeeping: 'b-blue', maintenance: 'b-red',
};

export default function InventoryPage() {
  const { t, n, L } = useLang();

  const lowItems = inventoryItems.filter((i) => i.stock <= i.reorder);
  const stockValue = inventoryItems.reduce((a, i) => a + i.stock * i.price, 0);

  const kpis = [
    { label: t('admin.inventory.totalItems'), val: n(inventoryItems.length), icon: 'box', bg: 'rgba(45,108,181,.12)', color: 'var(--blue)' },
    { label: t('admin.inventory.lowStock'), val: n(lowItems.length), icon: 'alert', bg: 'rgba(192,69,44,.12)', color: 'var(--red)' },
    { label: t('admin.inventory.stockValue'), val: fmtTaka(stockValue, n), icon: 'taka', bg: 'rgba(201,162,39,.14)', color: 'var(--gold)' },
    { label: t('admin.inventory.supplierCount'), val: n(suppliers.length), icon: 'users', bg: 'rgba(30,142,90,.12)', color: 'var(--green)' },
  ];

  return (
    <>
      <AdminTopbar title={t('admin.inventory.title')} sub={t('admin.inventory.sub')} />

      <div className="kpis" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
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

      {/* -------- STOCK ITEMS -------- */}
      <div className="acard" style={{ marginBottom: 18 }}>
        <div className="card-head">
          <div>
            <h2 className="serif">{t('admin.inventory.itemsTitle')}</h2>
            <div className="hint">{t('admin.inventory.itemsHint')}</div>
          </div>
          <button className="btn-admin no-print" onClick={() => alert(t('common.demoNote'))}>
            <Icon name="plus" size={15} stroke={2.4} /> {t('admin.inventory.newPO')}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>{t('admin.inventory.item')}</th>
                <th>{t('admin.inventory.category')}</th>
                <th>{t('admin.inventory.stock')}</th>
                <th>{t('admin.inventory.reorderLv')}</th>
                <th>{t('admin.inventory.unitPrice')}</th>
                <th>{t('admin.inventory.value')}</th>
                <th>{t('admin.inventory.supplier')}</th>
                <th>{t('admin.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item, i) => {
                const low = item.stock <= item.reorder;
                return (
                  <tr key={i} style={low ? { background: 'rgba(192,69,44,.05)' } : undefined}>
                    <td><b>{L(item.name)}</b></td>
                    <td><span className={`badge ${CAT_COLOR[item.cat]}`}>{t(`admin.inventory.cats.${item.cat}`)}</span></td>
                    <td>
                      <b style={{ color: low ? 'var(--red)' : 'var(--forest)' }}>
                        {n(item.stock)} {L(item.unit)}
                      </b>
                    </td>
                    <td style={{ color: 'var(--muted)' }}>{n(item.reorder)} {L(item.unit)}</td>
                    <td>{fmtTaka(item.price, n)}</td>
                    <td>{fmtTaka(item.stock * item.price, n)}</td>
                    <td style={{ fontSize: '.85rem' }}>{L(suppliers[item.supplierIdx].name)}</td>
                    <td>
                      <span className={`badge ${low ? 'b-red' : 'b-green'}`}>
                        {low ? t('admin.inventory.low') : t('admin.inventory.ok')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------- SUPPLIERS + PURCHASE ORDERS -------- */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="acard" style={{ marginBottom: 0 }}>
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.inventory.suppliersTitle')}</h2>
              <div className="hint">{t('admin.inventory.suppliersHint')}</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>{t('admin.inventory.supplier')}</th>
                <th>{t('admin.inventory.category')}</th>
                <th>{t('admin.inventory.contact')}</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, i) => (
                <tr key={i}>
                  <td><b>{L(s.name)}</b></td>
                  <td style={{ fontSize: '.85rem', color: 'var(--muted)' }}>{L(s.cat)}</td>
                  <td style={{ fontSize: '.85rem', whiteSpace: 'nowrap' }}>{s.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="acard" style={{ marginBottom: 0 }}>
          <div className="card-head">
            <div>
              <h2 className="serif">{t('admin.inventory.poTitle')}</h2>
              <div className="hint">{t('admin.inventory.poHint')}</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>{t('admin.inventory.poRef')}</th>
                <th>{t('admin.inventory.itemsCol')}</th>
                <th>{t('admin.finance.amount')}</th>
                <th>{t('admin.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po, i) => (
                <tr key={i}>
                  <td>
                    <b style={{ color: 'var(--forest)' }}>{po.ref}</b>
                    <span style={{ display: 'block', fontSize: '.72rem', color: 'var(--muted)' }}>{L(po.date)}</span>
                  </td>
                  <td style={{ fontSize: '.85rem' }}>{L(po.items)}</td>
                  <td><b>{fmtTaka(po.amount, n)}</b></td>
                  <td><StatusBadge status={po.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
