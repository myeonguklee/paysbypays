import { z } from 'zod';

export const MERCHANT_STATUS_OPTIONS = [
  'READY',
  'ACTIVE',
  'INACTIVE',
  'CLOSED',
] as const;

const merchantSchema = z.object({
  mchtName: z
    .string()
    .min(1, '가맹점명을 입력해주세요')
    .max(100, '가맹점명은 100자 이하여야 합니다'),
  bizType: z.string().min(1, '업종을 입력해주세요'),
  status: z.enum(MERCHANT_STATUS_OPTIONS, {
    message: '상태를 선택해주세요',
  }),
  bizNo: z
    .string()
    .regex(
      /^\d{3}-\d{2}-\d{5}$/,
      '사업자번호 형식이 올바르지 않습니다 (예: 123-45-67890)'
    )
    .optional(),
  address: z.string().max(200, '주소는 200자 이하여야 합니다').optional(),
  phone: z
    .string()
    .regex(/^[0-9-]+$/, '전화번호는 숫자와 하이픈(-)만 입력 가능합니다')
    .max(20, '전화번호는 20자 이하여야 합니다')
    .optional(),
  email: z
    .string()
    .max(100, '이메일은 100자 이하여야 합니다')
    .refine(
      (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      '올바른 이메일 형식이 아닙니다'
    )
    .optional(),
});

export const merchantEditSchema = merchantSchema;

export const merchantCreateSchema = merchantSchema.extend({
  mchtCode: z
    .string()
    .min(1, '가맹점 코드를 입력해주세요')
    .max(50, '가맹점 코드는 50자 이하여야 합니다')
    .regex(
      /^[A-Za-z0-9_-]+$/,
      '가맹점 코드는 영문, 숫자, 하이픈(-), 언더스코어(_)만 사용 가능합니다'
    ),
});

export type MerchantEditFormData = z.infer<typeof merchantEditSchema>;
export type MerchantCreateFormData = z.infer<typeof merchantCreateSchema>;
export type MerchantStatus = (typeof MERCHANT_STATUS_OPTIONS)[number];
