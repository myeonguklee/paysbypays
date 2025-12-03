import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ApiResponse } from '../type';
import { getMerchantStatus, getPaymentStatus, getPaymentType } from './service';
import { CommonResponse } from './type';

function transformToCodeMap<T>(response: ApiResponse<CommonResponse<T>[]>) {
  return Object.fromEntries(
    response.data.map((item) => [item.type, item.description])
  );
}

export const useGetPaymentStatusQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMON.PAYMENT_STATUS(),
    queryFn: getPaymentStatus,
    staleTime: Infinity,
    gcTime: Infinity,
    select: transformToCodeMap,
  });
};

export const useGetPaymentTypeQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMON.PAYMENT_TYPE(),
    queryFn: getPaymentType,
    staleTime: Infinity,
    gcTime: Infinity,
    select: transformToCodeMap,
  });
};

export const useGetMerchantStatusQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMON.MERCHANTS_TYPE(),
    queryFn: getMerchantStatus,
    staleTime: Infinity,
    gcTime: Infinity,
    select: transformToCodeMap,
  });
};
