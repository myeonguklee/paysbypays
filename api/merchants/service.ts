import { API_ENDPOINTS } from '@/constants/api';
import { axiosInstance } from '../axiosInstance';
import { ApiResponse } from '../type';
import { Merchant, MerchantDetail } from './type';

export const getMerchantsList = async (): Promise<ApiResponse<Merchant[]>> => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.MERCHANTS.LIST);

  return data;
};

export const getMerchantsDetails = async (): Promise<
  ApiResponse<MerchantDetail[]>
> => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.MERCHANTS.DETAILS);

  return data;
};

export const getMerchantsDetail = async (
  mchtCode: string
): Promise<ApiResponse<MerchantDetail>> => {
  const { data } = await axiosInstance.get(
    API_ENDPOINTS.MERCHANTS.DETAIL(mchtCode)
  );

  return data;
};
