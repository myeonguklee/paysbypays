'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { PaymentStatus, PaymentType } from '@/api/type';
import {
  merchantsList,
  paymentList,
  paymentStatusMap,
  paymentTypeMap,
} from '@/app/mock';
import { ROUTES } from '@/constants/Routes';

const ITEMS_PER_PAGE = 5;

const statusStyles = {
  SUCCESS: 'bg-green-100 text-green-800',
  FAILED: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-yellow-100 text-yellow-800',
  PENDING: 'bg-gray-100 text-gray-800',
} as const;

export const TransactionsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const mergedData = useMemo(() => {
    const merchantMap = new Map(
      merchantsList.map((m) => [m.mchtCode, m.mchtName])
    );
    return paymentList
      .map((p) => ({
        ...p,
        mchtName: merchantMap.get(p.mchtCode) || p.mchtCode,
        paymentAtFormatted: format(
          new Date(p.paymentAt),
          'yyyy-MM-dd HH:mm:ss'
        ),
        statusKor: paymentStatusMap[p.status as Exclude<PaymentStatus, string>],
        payTypeKor: paymentTypeMap[p.payType as Exclude<PaymentType, string>],
      }))
      .sort(
        (a, b) =>
          new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime()
      );
  }, []);

  const totalPages = Math.ceil(mergedData.length / ITEMS_PER_PAGE);
  const paginatedData = mergedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      statusStyles[p.status as Exclude<PaymentStatus, string>]
                    }`}
                  >
                    {p.statusKor}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {Number(p.amount).toLocaleString()} {p.currency}
                  </span>
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
                    {Number(p.amount).toLocaleString()} {p.currency}
                  </td>
                  <td className="px-6 py-4">{p.payTypeKor}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        statusStyles[p.status as Exclude<PaymentStatus, string>]
                      }`}
                    >
                      {p.statusKor}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-4 flex items-center justify-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="이전 페이지"
            className="bg-muted rounded-md px-3 py-1 text-sm disabled:opacity-50"
          >
            이전
          </button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="다음 페이지"
            className="bg-muted rounded-md px-3 py-1 text-sm disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </div>
    </section>
  );
};
