import { MerchantStatus } from '../type';

export interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: MerchantStatus;
  bizType: string;
}

export interface MerchantDetail extends Merchant {
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}
