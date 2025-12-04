'use client';

import { SortIcon } from '@/components/common/SortIcon';
import { PaymentAmount } from '@/components/payments/PaymentAmount';
import { PaymentStatusBadge } from '@/components/payments/PaymentStatusBadge';
import { SortField, SortOrder } from '@/utils/payments/sortPayments';
import { ProcessedPayment } from '@/utils/payments/transformPaymentData';

interface PaymentsTableProps {
  data: ProcessedPayment[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export const PaymentsTable = ({
  data,
  sortField,
  sortOrder,
  onSort,
}: PaymentsTableProps) => {
  const handleSort = (field: SortField) => {
    onSort(field);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: SortField) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleSort(field);
    }
  };

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-12 text-center shadow-sm">
        <p className="text-gray-500">조회된 거래 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      {/* 모바일: 카드 형태 */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-100">
          {data.map((p) => (
            <div key={p.paymentCode} className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{p.mchtName}</p>
                  <p className="text-xs text-gray-500">
                    {p.paymentAtFormatted}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{p.paymentCode}</p>
                </div>
                <PaymentStatusBadge status={p.status} />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <PaymentAmount
                  amount={p.amount}
                  currency={p.currency}
                  className="font-medium text-gray-900"
                />
                <span className="text-gray-500">{p.payTypeKor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 데스크톱: 테이블 형태 */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th
                scope="col"
                className="cursor-pointer px-6 py-4 hover:bg-gray-200"
                onClick={() => handleSort('paymentAt')}
                onKeyDown={(e) => handleKeyDown(e, 'paymentAt')}
                tabIndex={0}
                aria-label="거래시간 정렬"
              >
                <div className="flex items-center gap-1">
                  거래시간
                  <SortIcon
                    field="paymentAt"
                    currentField={sortField}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-4 hover:bg-gray-200"
                onClick={() => handleSort('mchtName')}
                onKeyDown={(e) => handleKeyDown(e, 'mchtName')}
                tabIndex={0}
                aria-label="가맹점 정렬"
              >
                <div className="flex items-center gap-1">
                  가맹점
                  <SortIcon
                    field="mchtName"
                    currentField={sortField}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th scope="col" className="hidden px-6 py-4 lg:block">
                거래코드
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-4 hover:bg-gray-200"
                onClick={() => handleSort('amount')}
                onKeyDown={(e) => handleKeyDown(e, 'amount')}
                tabIndex={0}
                aria-label="거래금액 정렬"
              >
                <div className="flex items-center gap-1">
                  거래금액
                  <SortIcon
                    field="amount"
                    currentField={sortField}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-4">
                결제수단
              </th>
              <th scope="col" className="px-6 py-4">
                상태
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr
                key={p.paymentCode}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4">{p.paymentAtFormatted}</td>
                <td className="px-6 py-4">{p.mchtName}</td>
                <td className="hidden px-6 py-4 lg:block">
                  <span className="text-xs text-gray-500">{p.paymentCode}</span>
                </td>
                <td className="px-6 py-4">
                  <PaymentAmount
                    amount={p.amount}
                    currency={p.currency}
                    className="font-medium"
                  />
                </td>
                <td className="px-6 py-4">{p.payTypeKor}</td>
                <td className="px-6 py-4">
                  <PaymentStatusBadge status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
