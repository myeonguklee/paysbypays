'use client';

import { Merchant } from '@/api/merchants/type';
import { PaymentStatus, PaymentType } from '@/api/type';
import { paymentStatusMap, paymentTypeMap } from '@/app/mock';

interface PaymentsFiltersProps {
  statusFilter: PaymentStatus | 'ALL';
  payTypeFilter: PaymentType | 'ALL';
  mchtCodeFilter: string;
  currencyFilter: string;
  merchants: Merchant[];
  currencies: string[];
  onStatusFilterChange: (value: PaymentStatus | 'ALL') => void;
  onPayTypeFilterChange: (value: PaymentType | 'ALL') => void;
  onMchtCodeFilterChange: (value: string) => void;
  onCurrencyFilterChange: (value: string) => void;
}

export const PaymentsFilters = ({
  statusFilter,
  payTypeFilter,
  mchtCodeFilter,
  currencyFilter,
  merchants,
  currencies,
  onStatusFilterChange,
  onPayTypeFilterChange,
  onMchtCodeFilterChange,
  onCurrencyFilterChange,
}: PaymentsFiltersProps) => {
  const statusOptions: Array<{ value: PaymentStatus | 'ALL'; label: string }> =
    [
      { value: 'ALL', label: '전체' },
      { value: 'SUCCESS', label: paymentStatusMap.SUCCESS },
      { value: 'FAILED', label: paymentStatusMap.FAILED },
      { value: 'CANCELLED', label: paymentStatusMap.CANCELLED },
      { value: 'PENDING', label: paymentStatusMap.PENDING },
    ];

  const payTypeOptions: Array<{ value: PaymentType | 'ALL'; label: string }> = [
    { value: 'ALL', label: '전체' },
    { value: 'ONLINE', label: paymentTypeMap.ONLINE },
    { value: 'DEVICE', label: paymentTypeMap.DEVICE },
    { value: 'MOBILE', label: paymentTypeMap.MOBILE },
    { value: 'VACT', label: paymentTypeMap.VACT },
    { value: 'BILLING', label: paymentTypeMap.BILLING },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 상태 필터 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-700">결제 상태</label>
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(e.target.value as PaymentStatus | 'ALL')
          }
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="결제 상태 필터"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 결제수단 필터 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-700">결제수단</label>
        <select
          value={payTypeFilter}
          onChange={(e) =>
            onPayTypeFilterChange(e.target.value as PaymentType | 'ALL')
          }
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="결제수단 필터"
        >
          {payTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 가맹점 필터 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-700">가맹점</label>
        <select
          value={mchtCodeFilter}
          onChange={(e) => onMchtCodeFilterChange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="가맹점 필터"
        >
          <option value="ALL">전체</option>
          {merchants.map((merchant) => (
            <option key={merchant.mchtCode} value={merchant.mchtCode}>
              {merchant.mchtName}
            </option>
          ))}
        </select>
      </div>

      {/* 통화 필터 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-700">통화</label>
        <select
          value={currencyFilter}
          onChange={(e) => onCurrencyFilterChange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="통화 필터"
        >
          <option value="ALL">전체</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
