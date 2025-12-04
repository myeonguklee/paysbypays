import { Merchant } from '@/api/merchants/type';

export type SortField = 'mchtName' | 'mchtCode';
export type SortOrder = 'asc' | 'desc';

/**
 * 가맹점 데이터 정렬
 */
export const sortMerchants = (
  merchants: Merchant[],
  sortField: SortField,
  sortOrder: SortOrder
): Merchant[] => {
  const sorted = [...merchants];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'mchtName':
        comparison = a.mchtName.localeCompare(b.mchtName, 'ko');
        break;
      case 'mchtCode':
        comparison = a.mchtCode.localeCompare(b.mchtCode);
        break;
      default:
        comparison = 0;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
};
