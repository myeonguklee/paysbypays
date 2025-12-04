import { MerchantStatus } from '@/api/type';

export const MERCHANT_STATUS_STYLES = {
  READY: 'bg-gray-100 text-gray-800',
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-yellow-100 text-yellow-800',
  CLOSED: 'bg-red-100 text-red-800',
} as const;

export const DEFAULT_ITEMS_PER_PAGE = 20;
export const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100] as const;

export const DEFAULT_SORT_FIELD = 'mchtName';
export const DEFAULT_SORT_ORDER = 'asc';

export const getStatusStyle = (status: MerchantStatus): string => {
  return (
    MERCHANT_STATUS_STYLES[status as Exclude<MerchantStatus, string>] ||
    MERCHANT_STATUS_STYLES.READY
  );
};
