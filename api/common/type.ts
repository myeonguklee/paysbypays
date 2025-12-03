import { MerchantStatus, PaymentStatus, PaymentType } from '../type';

export interface CommonResponse<T> {
  type: T;
  description: string;
}

export type PaymentStatusResponse = CommonResponse<PaymentStatus>;

export type PaymentTypeResponse = CommonResponse<PaymentType>;

export type MerchantStatusResponse = CommonResponse<MerchantStatus>;
