'use client';

import { Modal } from '@/components/Modal';
import { useGetMerchantStatusQuery } from '@/api/common/queries';
import { useGetMerchantsDetail } from '@/api/merchants/queries';
import { getStatusStyle } from '@/constants/merchants';

interface MerchantDetailModalProps {
  mchtCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MerchantDetailModal = ({
  mchtCode,
  isOpen,
  onClose,
}: MerchantDetailModalProps) => {
  const { data: merchantStatusMap = {} } = useGetMerchantStatusQuery();
  const {
    data: merchantDetail,
    isLoading,
    isError,
  } = useGetMerchantsDetail(isOpen ? mchtCode : '');

  const footer = (
    <button
      onClick={onClose}
      className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-200 focus:outline-none"
      aria-label="닫기"
    >
      닫기
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="가맹점 상세 정보"
      footer={footer}
      maxWidth="2xl"
    >
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center py-12">
          <div className="text-red-500">
            정보를 불러오는 중 오류가 발생했습니다.
          </div>
        </div>
      )}

      {merchantDetail && !isLoading && !isError && (
        <div className="space-y-6">
          {/* 기본 정보 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-700">
              기본 정보
            </h3>
            <div className="space-y-3">
              <div className="flex flex-row items-center gap-1">
                <label className="w-32 text-sm font-medium text-gray-500">
                  가맹점명
                </label>
                <span className="flex-1 text-sm text-gray-900">
                  {merchantDetail.mchtName}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <label className="w-32 text-sm font-medium text-gray-500">
                  가맹점 코드
                </label>
                <span className="flex-1 text-sm text-gray-900">
                  {merchantDetail.mchtCode}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <label className="w-32 text-sm font-medium text-gray-500">
                  업종
                </label>
                <span className="flex-1 text-sm text-gray-900">
                  {merchantDetail.bizType}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <label className="w-32 text-sm font-medium text-gray-500">
                  상태
                </label>
                <span className="flex-1">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(merchantDetail.status)}`}
                  >
                    {merchantStatusMap[merchantDetail.status] ||
                      merchantDetail.status}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* 사업자 정보 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-700">
              사업자 정보
            </h3>
            <div className="space-y-3">
              <div className="flex flex-row items-center gap-1">
                <label className="w-32 text-sm font-medium text-gray-500">
                  사업자번호
                </label>
                <span className="flex-1 text-sm text-gray-900">
                  {merchantDetail.bizNo || '-'}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <label className="w-32 text-sm font-medium text-gray-500">
                  주소
                </label>
                <span className="flex-1 text-sm text-gray-900">
                  {merchantDetail.address || '-'}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <label className="w-32 text-sm font-medium text-gray-500">
                  전화번호
                </label>
                <span className="flex-1 text-sm text-gray-900">
                  {merchantDetail.phone || '-'}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <label className="w-32 text-sm font-medium text-gray-500">
                  이메일
                </label>
                <span className="flex-1 text-sm text-gray-900">
                  {merchantDetail.email || '-'}
                </span>
              </div>
            </div>
          </div>

          {/* 등록 정보 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-700">
              등록 정보
            </h3>
            <div className="space-y-3">
              <div className="flex flex-row items-center gap-1">
                <label className="w-32 text-sm font-medium text-gray-500">
                  등록일시
                </label>
                <span className="flex-1 text-sm text-gray-900">
                  {merchantDetail.registeredAt
                    ? new Date(merchantDetail.registeredAt).toLocaleString(
                        'ko-KR'
                      )
                    : '-'}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1">
                <label className="w-32 text-sm font-medium text-gray-500">
                  수정일시
                </label>
                <span className="flex-1 text-sm text-gray-900">
                  {merchantDetail.updatedAt
                    ? new Date(merchantDetail.updatedAt).toLocaleString('ko-KR')
                    : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
