import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import {
  getMerchantStatus,
  getPaymentStatus,
  getPaymentType,
} from '@/api/common/service';
import { getMerchantsList } from '@/api/merchants/service';
import { getPaymentsList } from '@/api/payments/service';
import { createQueryClient } from '@/api/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ActiveMerchantCard } from './_components/ActiveMerchantCard';
import { DailyStatCard } from './_components/DailyStatCard';
import { FailureRateCard } from './_components/FailureRateCard';
import { TotalSummaryCard } from './_components/TotalSummaryCard';
import { TransactionsChart } from './_components/TransactionsChart';
import { TransactionsTable } from './_components/TransactionsTable';

export default async function Dashboard() {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.PAYMENT.LIST(),
      queryFn: getPaymentsList,
    }),
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.MERCHANTS.LIST(),
      queryFn: getMerchantsList,
    }),
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.COMMON.PAYMENT_STATUS(),
      queryFn: getPaymentStatus,
    }),
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.COMMON.PAYMENT_TYPE(),
      queryFn: getPaymentType,
    }),
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.COMMON.MERCHANTS_TYPE(),
      queryFn: getMerchantStatus,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DailyStatCard />
          <FailureRateCard />
          <ActiveMerchantCard />
          <TotalSummaryCard />
        </section>
        <TransactionsChart />
        <TransactionsTable />
      </div>
    </HydrationBoundary>
  );
}
