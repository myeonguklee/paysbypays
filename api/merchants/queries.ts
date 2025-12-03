import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import {
  getMerchantsDetail,
  getMerchantsDetails,
  getMerchantsList,
} from './service';

export const useGetMerchantsListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.MERCHANTS.LIST(),
    queryFn: getMerchantsList,
    select: (response) => response.data,
  });
};

export const useGetMerchantsDetailsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.MERCHANTS.DETAILS(),
    queryFn: getMerchantsDetails,
    select: (response) => response.data,
  });
};

export const useGetMerchantsDetail = (mchtCode: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.MERCHANTS.DETAIL(mchtCode),
    queryFn: () => getMerchantsDetail(mchtCode),
    enabled: !!mchtCode,
    select: (response) => response.data,
  });
};
