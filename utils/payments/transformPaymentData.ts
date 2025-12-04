import { format } from 'date-fns';
import { Merchant } from '@/api/merchants/type';
import { Payment } from '@/api/payments/type';
import { PaymentStatus, PaymentType } from '@/api/type';
import { paymentStatusMap, paymentTypeMap } from '@/app/mock';

export interface ProcessedPayment {
  paymentCode: string;
  mchtCode: string;
  mchtName: string;
  amount: string;
  currency: string;
  payType: PaymentType;
  payTypeKor: string;
  status: PaymentStatus;
  statusKor: string;
  paymentAt: string;
  paymentAtFormatted: string;
}

/**
 * 가맹점 맵 생성
 */
export const createMerchantMap = (
  merchants: Merchant[]
): Map<string, string> => {
  return new Map(merchants.map((m) => [m.mchtCode, m.mchtName]));
};

/**
 * 결제 데이터 변환 (가맹점명, 포맷팅 등)
 */
export const transformPaymentData = (
  payment: Payment,
  merchantMap: Map<string, string>
): ProcessedPayment => {
  return {
    ...payment,
    mchtName: merchantMap.get(payment.mchtCode) || payment.mchtCode,
    paymentAtFormatted: format(
      new Date(payment.paymentAt),
      'yyyy-MM-dd HH:mm:ss'
    ),
    statusKor:
      paymentStatusMap[payment.status as Exclude<PaymentStatus, string>],
    payTypeKor: paymentTypeMap[payment.payType as Exclude<PaymentType, string>],
  };
};

/**
 * 여러 결제 데이터 일괄 변환
 */
export const transformPaymentsData = (
  payments: Payment[],
  merchantMap: Map<string, string>
): ProcessedPayment[] => {
  return payments.map((p) => transformPaymentData(p, merchantMap));
};
