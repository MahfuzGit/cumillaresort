'use client';
import { useLang } from '../lib/i18n';

const COLORS = {
  confirmed: 'b-green', pending: 'b-amber', checkedIn: 'b-blue', cancelled: 'b-red',
  checkedOut: 'b-grey', occupied: 'b-green', arriving: 'b-amber', vacant: 'b-grey',
  maintenance: 'b-red', inProgress: 'b-amber', queued: 'b-grey', done: 'b-green',
  withVendor: 'b-blue', urgent: 'b-red', high: 'b-amber', normal: 'b-grey',
  onDuty: 'b-green', offDuty: 'b-grey', onLeave: 'b-amber',
  gold: 'b-amber', silver: 'b-grey', platinum: 'b-green', star: 'b-blue',
  open: 'b-red', resolved: 'b-green', advancePaid: 'b-green', awaitingAdvance: 'b-amber',
  complaint: 'b-red', praise: 'b-green', suggestion: 'b-blue',
  partial: 'b-amber', paid: 'b-green', expectedToday: 'b-amber',
};

export default function StatusBadge({ status }) {
  const { t } = useLang();
  return <span className={`badge ${COLORS[status] || 'b-grey'}`}>{t(`admin.status.${status}`)}</span>;
}
