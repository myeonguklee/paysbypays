import { API_ENDPOINTS } from '@/constants/api';
import { axiosInstance } from '../axiosInstance';
import { ApiResponse } from '../type';
import {
  MerchantStatusResponse,
  PaymentStatusResponse,
  PaymentTypeResponse,
} from './type';

export const getPaymentStatus = async (): Promise<
  ApiResponse<PaymentStatusResponse[]>
> => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.COMMON.PAYMENT_STATUS);

  return data;
};

export const getPaymentType = async (): Promise<
  ApiResponse<PaymentTypeResponse[]>
> => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.COMMON.PAYMENT_TYPE);

  return data;
};

export const getMerchantStatus = async (): Promise<
  ApiResponse<MerchantStatusResponse[]>
> => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.COMMON.MERCHANT_STATUS
  );

  return data;
};
