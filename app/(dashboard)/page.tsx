import { ActiveMerchantCard } from './_components/ActiveMerchantCard';
import { DailyStatCard } from './_components/DailyStatCard';
import { FailureRateCard } from './_components/FailureRateCard';
import { TotalSummaryCard } from './_components/TotalSummaryCard';
import { TransactionsChart } from './_components/TransactionsChart';
import { TransactionsTable } from './_components/TransactionsTable';

export default function Dashboard() {
  return (
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
  );
}
