import { PaymentStatus, PaymentType } from '../type';

export interface Payment {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: PaymentType;
  status: PaymentStatus;
  paymentAt: string;
}
