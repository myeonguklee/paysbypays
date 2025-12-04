'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useGetMerchantStatusQuery } from '@/api/common/queries';
import {
  MERCHANT_STATUS_OPTIONS,
  MerchantCreateFormData,
  MerchantEditFormData,
} from '@/schemas/merchant';
import { FormInput, FormReadOnlyField, FormSelect } from './FormField';

interface MerchantFormFieldsProps {
  register: UseFormRegister<MerchantEditFormData | MerchantCreateFormData>;
  errors: FieldErrors<MerchantEditFormData | MerchantCreateFormData>;
  showMchtCode?: boolean;
  mchtCodeValue?: string;
  mchtCodeRegister?: UseFormRegister<MerchantCreateFormData>;
  mchtCodeError?: string | undefined;
}

export const MerchantFormFields = ({
  register,
  errors,
  showMchtCode = false,
  mchtCodeValue,
  mchtCodeRegister,
  mchtCodeError,
}: MerchantFormFieldsProps) => {
  const { data: merchantStatusMap = {} } = useGetMerchantStatusQuery();

  return (
    <>
      {/* 기본 정보 */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">기본 정보</h3>
        <div className="space-y-4">
          {/* 가맹점 코드 */}
          {showMchtCode && mchtCodeRegister && (
            <FormInput<MerchantCreateFormData>
              id="mchtCode"
              label="가맹점 코드"
              type="text"
              placeholder="가맹점 코드를 입력하세요"
              required
              register={mchtCodeRegister}
              fieldName="mchtCode"
              error={
                mchtCodeError
                  ? { message: mchtCodeError, type: 'manual' }
                  : undefined
              }
            />
          )}

          {/* 가맹점 코드 (읽기 전용) */}
          {mchtCodeValue && (
            <FormReadOnlyField label="가맹점 코드" value={mchtCodeValue} />
          )}

          {/* 가맹점명 */}
          <FormInput<MerchantEditFormData | MerchantCreateFormData>
            id="mchtName"
            label="가맹점명"
            type="text"
            placeholder="가맹점명을 입력하세요"
            required
            register={register}
            fieldName="mchtName"
            error={errors.mchtName}
          />

          {/* 업종 */}
          <FormInput<MerchantEditFormData | MerchantCreateFormData>
            id="bizType"
            label="업종"
            type="text"
            placeholder="업종을 입력하세요"
            required
            register={register}
            fieldName="bizType"
            error={errors.bizType}
          />

          {/* 상태 */}
          <FormSelect<MerchantEditFormData | MerchantCreateFormData>
            id="status"
            label="상태"
            required
            register={register}
            fieldName="status"
            error={errors.status}
          >
            {MERCHANT_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {merchantStatusMap[status] || status}
              </option>
            ))}
          </FormSelect>
        </div>
      </div>

      {/* 사업자 정보 */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-700">
          사업자 정보
        </h3>
        <div className="space-y-4">
          {/* 사업자번호 */}
          <FormInput<MerchantEditFormData | MerchantCreateFormData>
            id="bizNo"
            label="사업자번호"
            type="text"
            placeholder="123-45-67890"
            register={register}
            fieldName="bizNo"
            error={errors.bizNo}
          />

          {/* 주소 */}
          <FormInput<MerchantEditFormData | MerchantCreateFormData>
            id="address"
            label="주소"
            type="text"
            placeholder="주소를 입력하세요"
            register={register}
            fieldName="address"
            error={errors.address}
          />

          {/* 전화번호 */}
          <FormInput<MerchantEditFormData | MerchantCreateFormData>
            id="phone"
            label="전화번호"
            type="tel"
            placeholder="02-1234-5678"
            register={register}
            fieldName="phone"
            error={errors.phone}
          />

          {/* 이메일 */}
          <FormInput<MerchantEditFormData | MerchantCreateFormData>
            id="email"
            label="이메일"
            type="email"
            placeholder="example@email.com"
            register={register}
            fieldName="email"
            error={errors.email}
          />
        </div>
      </div>
    </>
  );
};
