'use client';

import { useGetMerchantStatusQuery } from '@/api/common/queries';
import { Merchant } from '@/api/merchants/type';
import { MerchantStatus } from '@/api/type';

interface MerchantsFiltersProps {
  statusFilter: MerchantStatus | 'ALL';
  bizTypeFilter: string;
  mchtCodeFilter: string;
  bizTypes: string[];
  merchants: Merchant[];
  onStatusFilterChange: (value: MerchantStatus | 'ALL') => void;
  onBizTypeFilterChange: (value: string) => void;
  onMchtCodeFilterChange: (value: string) => void;
}

export const MerchantsFilters = ({
  statusFilter,
  bizTypeFilter,
  mchtCodeFilter,
  bizTypes,
  merchants,
  onStatusFilterChange,
  onBizTypeFilterChange,
  onMchtCodeFilterChange,
}: MerchantsFiltersProps) => {
  const { data: merchantStatusMap = {} } = useGetMerchantStatusQuery();

  const statusOptions: Array<{ value: MerchantStatus | 'ALL'; label: string }> =
    [
      { value: 'ALL', label: '전체' },
      { value: 'READY', label: merchantStatusMap.READY || '대기' },
      { value: 'ACTIVE', label: merchantStatusMap.ACTIVE || '활성' },
      { value: 'INACTIVE', label: merchantStatusMap.INACTIVE || '중지' },
      { value: 'CLOSED', label: merchantStatusMap.CLOSED || '폐기' },
    ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* 상태 필터 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-700">상태</label>
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(e.target.value as MerchantStatus | 'ALL')
          }
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="상태 필터"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 업종 필터 */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-700">업종</label>
        <select
          value={bizTypeFilter}
          onChange={(e) => onBizTypeFilterChange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          aria-label="업종 필터"
        >
          <option value="ALL">전체</option>
          {bizTypes.map((bizType) => (
            <option key={bizType} value={bizType}>
              {bizType}
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
    </div>
  );
};
