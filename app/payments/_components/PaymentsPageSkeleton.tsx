import { SkeletonBox } from '@/components/SkeletonBox';

export default function PaymentsPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <SkeletonBox className="h-8 w-32" />
        <SkeletonBox className="h-10 w-32" />
      </div>

      <div className="flex flex-col gap-4">
        {/* 검색 및 필터 */}
        <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          {/* 검색 바 */}
          <SkeletonBox className="h-10 w-full" />

          {/* 필터 버튼들 */}
          <div className="flex flex-wrap gap-2">
            <SkeletonBox className="h-9 w-24" />
            <SkeletonBox className="h-9 w-24" />
            <SkeletonBox className="h-9 w-24" />
            <SkeletonBox className="h-9 w-24" />
          </div>
        </div>

        {/* 테이블 */}
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
          {/* 데스크톱: 테이블 형태 */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">
                    <SkeletonBox className="h-4 w-20" />
                  </th>
                  <th className="px-6 py-4">
                    <SkeletonBox className="h-4 w-16" />
                  </th>
                  <th className="hidden px-6 py-4 lg:block">
                    <SkeletonBox className="h-4 w-20" />
                  </th>
                  <th className="px-6 py-4">
                    <SkeletonBox className="h-4 w-16" />
                  </th>
                  <th className="px-6 py-4">
                    <SkeletonBox className="h-4 w-20" />
                  </th>
                  <th className="px-6 py-4">
                    <SkeletonBox className="h-4 w-12" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <SkeletonBox className="h-5 w-32" />
                    </td>
                    <td className="px-6 py-4">
                      <SkeletonBox className="h-5 w-24" />
                    </td>
                    <td className="hidden px-6 py-4 lg:block">
                      <SkeletonBox className="h-4 w-28" />
                    </td>
                    <td className="px-6 py-4">
                      <SkeletonBox className="h-5 w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <SkeletonBox className="h-5 w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <SkeletonBox className="h-6 w-16" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일: 카드 형태 */}
          <div className="block md:hidden">
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex-1">
                      <SkeletonBox className="mb-1 h-5 w-32" />
                      <SkeletonBox className="mb-1 h-4 w-24" />
                      <SkeletonBox className="h-3 w-28" />
                    </div>
                    <SkeletonBox className="h-6 w-16" />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <SkeletonBox className="h-5 w-24" />
                    <SkeletonBox className="h-5 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:flex-row">
          <SkeletonBox className="h-5 w-32" />
          <div className="flex items-center gap-2">
            <SkeletonBox className="h-9 w-9" />
            <SkeletonBox className="h-9 w-9" />
            <SkeletonBox className="h-9 w-9" />
            <SkeletonBox className="h-9 w-9" />
            <SkeletonBox className="h-9 w-9" />
          </div>
          <SkeletonBox className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}
