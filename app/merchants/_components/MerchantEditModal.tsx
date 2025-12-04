'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/Modal';
import { useGetMerchantsDetail } from '@/api/merchants/queries';
import {
  MerchantEditFormData,
  MerchantStatus,
  merchantEditSchema,
} from '@/schemas/merchant';
import { MerchantFormFields } from './MerchantFormFields';

interface MerchantEditModalProps {
  mchtCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MerchantEditModal = ({
  mchtCode,
  isOpen,
  onClose,
}: MerchantEditModalProps) => {
  const {
    data: merchantDetail,
    isLoading,
    isError,
  } = useGetMerchantsDetail(mchtCode);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MerchantEditFormData>({
    resolver: zodResolver(merchantEditSchema),
    defaultValues: {
      mchtName: '',
      bizType: '',
      status: 'READY',
      bizNo: '',
      address: '',
      phone: '',
      email: '',
    },
  });

  useEffect(() => {
    if (merchantDetail && isOpen) {
      reset({
        mchtName: merchantDetail.mchtName || '',
        bizType: merchantDetail.bizType || '',
        status: merchantDetail.status as MerchantStatus,
        bizNo: merchantDetail.bizNo || '',
        address: merchantDetail.address || '',
        phone: merchantDetail.phone || '',
        email: merchantDetail.email || '',
      });
    }
  }, [merchantDetail, isOpen, reset]);

  const handleFormSubmit = async (data: MerchantEditFormData) => {
    try {
      // TODO: API 연동
      console.log('수정 데이터:', data);
      console.log('가맹점 코드:', mchtCode);
      onClose();
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const footer = (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={handleCancel}
        className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-200 focus:outline-none"
        aria-label="취소"
      >
        취소
      </button>
      <button
        type="submit"
        form="merchant-edit-form"
        disabled={isSubmitting}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="저장"
      >
        {isSubmitting ? '저장 중...' : '저장'}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="가맹점 수정"
      footer={footer}
      maxWidth="2xl"
    >
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">로딩 중...</div>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          <div className="text-red-500">
            정보를 불러오는 중 오류가 발생했습니다.
          </div>
        </div>
      )}

      {merchantDetail && !isLoading && !isError && (
        <form
          id="merchant-edit-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <MerchantFormFields
            register={register}
            errors={errors}
            mchtCodeValue={mchtCode}
          />
        </form>
      )}
    </Modal>
  );
};
