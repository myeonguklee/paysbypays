import { API_ENDPOINTS } from '@/constants/api';
import { axiosInstance } from '../axiosInstance';
import { ApiResponse } from '../type';
import { Payment } from './type';

export const getPaymentsList = async (): Promise<ApiResponse<Payment[]>> => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.PAYMENT.LIST);

  return data;
};
