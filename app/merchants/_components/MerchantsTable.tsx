'use client';

import { SortIcon } from '@/components/common/SortIcon';
import { Merchant } from '@/api/merchants/type';
import { MerchantStatus } from '@/api/type';
import { merchantStatusMap } from '@/app/mock';
import { getStatusStyle } from '@/constants/merchants';
import { SortField, SortOrder } from '@/utils/merchants/sortMerchants';

interface MerchantsTableProps {
  data: Merchant[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export const MerchantsTable = ({
  data,
  sortField,
  sortOrder,
  onSort,
}: MerchantsTableProps) => {
  const handleSort = (field: SortField) => {
    onSort(field);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: SortField) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleSort(field);
    }
  };

  const handleDetailClick = (mchtCode: string) => {
    // TODO: 상세보기 기능 구현
    console.log('상세보기:', mchtCode);
  };

  const handleEditClick = (mchtCode: string) => {
    // TODO: 수정하기 기능 구현
    console.log('수정하기:', mchtCode);
  };

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-gray-100 bg-white p-12 text-center shadow-sm">
        <p className="text-gray-500">조회된 가맹점이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      {/* 모바일: 카드 형태 */}
      <div className="block md:hidden">
        <div className="divide-y divide-gray-100">
          {data.map((m) => (
            <div key={m.mchtCode} className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{m.mchtName}</p>
                  <p className="mt-1 text-xs text-gray-400">{m.mchtCode}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(m.status)}`}
                >
                  {
                    merchantStatusMap[
                      m.status as Exclude<MerchantStatus, string>
                    ]
                  }
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">{m.bizType}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDetailClick(m.mchtCode)}
                    className="rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    aria-label={`${m.mchtName} 상세보기`}
                  >
                    상세보기
                  </button>
                  <button
                    onClick={() => handleEditClick(m.mchtCode)}
                    className="rounded-md bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                    aria-label={`${m.mchtName} 수정하기`}
                  >
                    수정하기
                  </button>
                </div>
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
                onClick={() => handleSort('mchtName')}
                onKeyDown={(e) => handleKeyDown(e, 'mchtName')}
                tabIndex={0}
                aria-label="가맹점명 정렬"
              >
                <div className="flex items-center gap-1">
                  가맹점명
                  <SortIcon
                    field="mchtName"
                    currentField={sortField}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-4 hover:bg-gray-200"
                onClick={() => handleSort('mchtCode')}
                onKeyDown={(e) => handleKeyDown(e, 'mchtCode')}
                tabIndex={0}
                aria-label="가맹점 코드 정렬"
              >
                <div className="flex items-center gap-1">
                  가맹점 코드
                  <SortIcon
                    field="mchtCode"
                    currentField={sortField}
                    order={sortOrder}
                  />
                </div>
              </th>
              <th scope="col" className="px-6 py-4">
                업종
              </th>
              <th scope="col" className="px-6 py-4">
                상태
              </th>
              <th scope="col" className="px-6 py-4" />
            </tr>
          </thead>
          <tbody>
            {data.map((m) => (
              <tr
                key={m.mchtCode}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {m.mchtName}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-gray-500">{m.mchtCode}</span>
                </td>
                <td className="px-6 py-4 text-gray-700">{m.bizType}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(m.status)}`}
                  >
                    {
                      merchantStatusMap[
                        m.status as Exclude<MerchantStatus, string>
                      ]
                    }
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleDetailClick(m.mchtCode)}
                      className="rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      aria-label={`${m.mchtName} 상세보기`}
                    >
                      상세보기
                    </button>
                    <button
                      onClick={() => handleEditClick(m.mchtCode)}
                      className="rounded-md bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                      aria-label={`${m.mchtName} 수정하기`}
                    >
                      수정하기
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
