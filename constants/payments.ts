import { PaymentStatus } from '@/api/type';

export const PAYMENT_STATUS_STYLES = {
  SUCCESS: 'bg-green-100 text-green-800',
  FAILED: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-yellow-100 text-yellow-800',
  PENDING: 'bg-gray-100 text-gray-800',
} as const;

export const DEFAULT_ITEMS_PER_PAGE = 20;
export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100] as const;

export const DEFAULT_SORT_FIELD = 'paymentAt';
export const DEFAULT_SORT_ORDER = 'desc';

export const getStatusStyle = (status: PaymentStatus): string => {
  return (
    PAYMENT_STATUS_STYLES[status as Exclude<PaymentStatus, string>] ||
    PAYMENT_STATUS_STYLES.PENDING
  );
};
