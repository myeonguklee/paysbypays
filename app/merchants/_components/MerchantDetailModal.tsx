'use client';

import { Modal } from '@/components/Modal';
import { useGetMerchantStatusQuery } from '@/api/common/queries';
import { useGetMerchantsDetail } from '@/api/merchants/queries';
import { getStatusStyle } from '@/constants/merchants';
import { ReadOnlyField } from './ReadOnlyField';

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
  } = useGetMerchantsDetail(mchtCode);

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
              <ReadOnlyField label="가맹점명" value={merchantDetail.mchtName} />
              <ReadOnlyField
                label="가맹점 코드"
                value={merchantDetail.mchtCode}
              />
              <ReadOnlyField label="업종" value={merchantDetail.bizType} />
              <ReadOnlyField
                label="상태"
                value={
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusStyle(merchantDetail.status)}`}
                  >
                    {merchantStatusMap[merchantDetail.status] ||
                      merchantDetail.status}
                  </span>
                }
              />
            </div>
          </div>

          {/* 사업자 정보 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-700">
              사업자 정보
            </h3>
            <div className="space-y-3">
              <ReadOnlyField label="사업자번호" value={merchantDetail.bizNo} />
              <ReadOnlyField label="주소" value={merchantDetail.address} />
              <ReadOnlyField label="전화번호" value={merchantDetail.phone} />
              <ReadOnlyField label="이메일" value={merchantDetail.email} />
            </div>
          </div>

          {/* 등록 정보 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-700">
              등록 정보
            </h3>
            <div className="space-y-3">
              <ReadOnlyField
                label="등록일시"
                value={
                  merchantDetail.registeredAt
                    ? new Date(merchantDetail.registeredAt).toLocaleString(
                        'ko-KR'
                      )
                    : null
                }
              />
              <ReadOnlyField
                label="수정일시"
                value={
                  merchantDetail.updatedAt
                    ? new Date(merchantDetail.updatedAt).toLocaleString('ko-KR')
                    : null
                }
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
