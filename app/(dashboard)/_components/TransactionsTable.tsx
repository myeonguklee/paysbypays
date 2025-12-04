'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { EmptyState } from '@/components/EmptyState';
import { Pagination } from '@/components/Pagination';
import { PaymentAmount } from '@/components/payments/PaymentAmount';
import { PaymentStatusBadge } from '@/components/payments/PaymentStatusBadge';
import { usePagination } from '@/hooks/usePagination';
import {
  useGetPaymentStatusQuery,
  useGetPaymentTypeQuery,
} from '@/api/common/queries';
import { useGetMerchantsListQuery } from '@/api/merchants/queries';
import { useGetPaymentsListQuery } from '@/api/payments/queries';
import { ROUTES } from '@/constants/Routes';
import { ITEMS_PER_PAGE_OPTIONS } from '@/constants/payments';
import { sortPayments } from '@/utils/payments/sortPayments';
import {
  createMerchantMap,
  transformPaymentsData,
} from '@/utils/payments/transformPaymentData';

export const TransactionsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { data: paymentList = [] } = useGetPaymentsListQuery();
  const { data: merchantsList = [] } = useGetMerchantsListQuery();
  const { data: paymentStatusMap = {} } = useGetPaymentStatusQuery();
  const { data: paymentTypeMap = {} } = useGetPaymentTypeQuery();

  const mergedData = useMemo(() => {
    const merchantMap = createMerchantMap(merchantsList);
    const transformed = transformPaymentsData(
      paymentList,
      merchantMap,
      paymentStatusMap,
      paymentTypeMap
    );
    return sortPayments(transformed, 'paymentAt', 'desc');
  }, [paymentList, merchantsList, paymentStatusMap, paymentTypeMap]);

  // 페이지네이션 계산
  const { totalPages, startIndex, endIndex } = usePagination({
    totalItems: mergedData.length,
    itemsPerPage,
    currentPage,
  });

  const paginatedData = mergedData.slice(startIndex, endIndex);

  if (mergedData.length === 0) {
    return (
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-muted-foreground text-lg font-medium">
            거래 내역
          </h3>
          <Link
            href={ROUTES.PAYMENTS}
            className="relative top-2 text-sm text-gray-500"
          >
            상세 보기 &gt;
          </Link>
        </div>
        <EmptyState message="거래 내역이 없습니다." />
      </section>
    );
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-muted-foreground text-lg font-medium">거래 내역</h3>
        <Link
          href={ROUTES.PAYMENTS}
          className="relative top-2 text-sm text-gray-500"
        >
          상세 보기 &gt;
        </Link>
      </div>

      <div className="h-auto overflow-hidden rounded-lg border border-gray-100 shadow-sm">
        {/* 모바일: 카드 형태 */}
        <div className="block md:hidden">
          <div className="divide-y divide-gray-100">
            {paginatedData.map((p) => (
              <div key={p.paymentCode} className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{p.mchtName}</p>
                    <p className="text-xs text-gray-500">
                      {p.paymentAtFormatted}
                    </p>
                  </div>
                  <PaymentStatusBadge status={p.status} />
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <PaymentAmount
                    amount={p.amount}
                    currency={p.currency}
                    className="text-gray-600"
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
                <th scope="col" className="px-6 py-4">
                  거래시간
                </th>
                <th scope="col" className="px-6 py-4">
                  가맹점
                </th>
                <th scope="col" className="px-6 py-4">
                  거래금액
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
              {paginatedData.map((p) => (
                <tr key={p.paymentCode} className="border-b border-gray-100">
                  <td className="px-6 py-4">{p.paymentAtFormatted}</td>
                  <td className="px-6 py-4">{p.mchtName}</td>
                  <td className="px-6 py-4">
                    <PaymentAmount amount={p.amount} currency={p.currency} />
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
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={mergedData.length}
          itemsPerPageOptions={ITEMS_PER_PAGE_OPTIONS}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </section>
  );
};
