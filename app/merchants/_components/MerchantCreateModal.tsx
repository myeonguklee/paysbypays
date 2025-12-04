'use client';

import { UseFormRegister, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/Modal';
import {
  MerchantCreateFormData,
  MerchantEditFormData,
  merchantCreateSchema,
} from '@/schemas/merchant';
import { MerchantFormFields } from './MerchantFormFields';

interface MerchantCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MerchantCreateModal = ({
  isOpen,
  onClose,
}: MerchantCreateModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MerchantCreateFormData>({
    resolver: zodResolver(merchantCreateSchema),
    defaultValues: {
      mchtCode: '',
      mchtName: '',
      bizType: '',
      status: 'READY',
      bizNo: '',
      address: '',
      phone: '',
      email: '',
    },
  });

  const handleFormSubmit = async (data: MerchantCreateFormData) => {
    try {
      // TODO: API 연동
      console.log('추가 데이터:', data);
      reset();
      onClose();
    } catch (error) {
      console.error('추가 실패:', error);
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
        form="merchant-create-form"
        disabled={isSubmitting}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="추가"
      >
        {isSubmitting ? '추가 중...' : '추가'}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="가맹점 추가"
      footer={footer}
      maxWidth="2xl"
    >
      <form
        id="merchant-create-form"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <MerchantFormFields
          register={
            register as UseFormRegister<
              MerchantEditFormData | MerchantCreateFormData
            >
          }
          errors={errors}
          showMchtCode={true}
          mchtCodeRegister={register}
          mchtCodeError={errors.mchtCode?.message}
        />
      </form>
    </Modal>
  );
};
