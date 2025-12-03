export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export type PaymentType =
  | 'ONLINE'
  | 'DEVICE'
  | 'MOBILE'
  | 'VACT'
  | 'BILLING'
  | string;

export type PaymentStatus =
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED'
  | string;

export type MerchantStatus =
  | 'READY'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'CLOSED'
  | string;
