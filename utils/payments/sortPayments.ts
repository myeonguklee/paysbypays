import { ProcessedPayment } from './transformPaymentData';

export type SortField = 'paymentAt' | 'amount' | 'mchtName';
export type SortOrder = 'asc' | 'desc';

/**
 * 결제 데이터 정렬
 */
export const sortPayments = (
  payments: ProcessedPayment[],
  sortField: SortField,
  sortOrder: SortOrder
): ProcessedPayment[] => {
  const sorted = [...payments];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'paymentAt':
        comparison =
          new Date(a.paymentAt).getTime() - new Date(b.paymentAt).getTime();
        break;
      case 'amount':
        comparison = Number(a.amount) - Number(b.amount);
        break;
      case 'mchtName':
        comparison = a.mchtName.localeCompare(b.mchtName);
        break;
      default:
        comparison = 0;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sorted;
};
