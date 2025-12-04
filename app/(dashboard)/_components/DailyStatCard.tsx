'use client';

import Link from 'next/link';
import { isSameDay, startOfToday, subDays } from 'date-fns';
import { useGetPaymentsListQuery } from '@/api/payments/queries';
import { Payment } from '@/api/payments/type';
import { PaymentStatus } from '@/api/type';
import { ROUTES } from '@/constants/Routes';
import { convertToKRW } from '@/utils/currency';
import { StatCard } from './StatCard';

type DailyChange = {
  changeAmount: number;
  changeRate: number;
  isIncrease: boolean;
};

const calculateDailySummary = (paymentList: Payment[]) => {
  const today = startOfToday();
  const yesterday = subDays(today, 1);

  const isCountableStatus = (status: PaymentStatus) => status === 'SUCCESS';

  const todaysPayments = paymentList.filter((payment) =>
    isSameDay(new Date(payment.paymentAt), today)
  );

  const dailyVolume = todaysPayments.reduce((sum, payment) => {
    if (isCountableStatus(payment.status)) {
      return sum + convertToKRW(Number(payment.amount), payment.currency);
    }
    return sum;
  }, 0);

  const dailyCount = todaysPayments.length;

  const todayTotalAmount = dailyVolume;

  const yesterdayTotalAmount = paymentList
    .filter(
      (payment) =>
        isSameDay(new Date(payment.paymentAt), yesterday) &&
        isCountableStatus(payment.status)
    )
    .reduce(
      (sum, payment) =>
        sum + convertToKRW(Number(payment.amount), payment.currency),
      0
    );

  let dailyChange: DailyChange = {
    changeAmount: todayTotalAmount,
    changeRate: 0,
    isIncrease: todayTotalAmount >= 0,
  };

  if (yesterdayTotalAmount > 0) {
    const changeAmount = todayTotalAmount - yesterdayTotalAmount;
    const changeRate = (changeAmount / yesterdayTotalAmount) * 100;

    dailyChange = {
      changeAmount,
      changeRate,
      isIncrease: changeAmount >= 0,
    };
  }

  return {
    dailyVolume,
    dailyCount,
    dailyChange,
  };
};

export const DailyStatCard = () => {
  const { data: paymentList = [] } = useGetPaymentsListQuery();
  const { dailyVolume, dailyCount, dailyChange } =
    calculateDailySummary(paymentList);

  return (
    <StatCard title="당일 거래">
      <p className="flex items-end gap-2 text-3xl font-bold">
        <span>{`${dailyVolume.toLocaleString()}원`}</span>
        <span className="text-xl">{`(총 ${dailyCount.toLocaleString()}건)`}</span>
      </p>

      <p className="flex items-center gap-2 text-gray-500">
        <span>전일 대비</span>
        <span
          className={
            dailyChange.isIncrease ? 'text-emerald-600' : 'text-red-600'
          }
        >
          {dailyChange.isIncrease ? '▲ ' : '▼ '}
          {Math.abs(dailyChange.changeAmount).toLocaleString()}원
        </span>
        <span>({dailyChange.changeRate.toFixed(1)}%)</span>
      </p>
      <Link href={ROUTES.PAYMENTS} className="self-end text-sm text-gray-500">
        상세 보기 &gt;
      </Link>
    </StatCard>
  );
};
