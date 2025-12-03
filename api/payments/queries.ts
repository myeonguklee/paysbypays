import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPaymentsList } from './service';

export const useGetPaymentsListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PAYMENT.LIST(),
    queryFn: getPaymentsList,
    select: (response) => response.data,
  });
};
