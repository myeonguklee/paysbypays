'use client';

import Link from 'next/link';
import { useGetPaymentsListQuery } from '@/api/payments/queries';
import { Payment } from '@/api/payments/type';
import { ROUTES } from '@/constants/Routes';
import { StatCard } from './StatCard';

const calculateFailureRate = (paymentList: Payment[]) => {
  const successCount = paymentList.filter(
    (payment) => payment.status === 'SUCCESS'
  ).length;
  const failedCount = paymentList.filter(
    (payment) => payment.status === 'FAILED'
  ).length;

  const totalCount = successCount + failedCount;

  if (totalCount === 0) {
    return {
      failureRate: '0.00',
      failedCount: 0,
      totalCount: 0,
    };
  }

  const rate = (failedCount / totalCount) * 100;

  return {
    failureRate: rate.toFixed(2),
    failedCount,
    totalCount,
  };
};

export const FailureRateCard = () => {
  const { data: paymentList = [] } = useGetPaymentsListQuery();
  const { failureRate, failedCount, totalCount } =
    calculateFailureRate(paymentList);

  return (
    <StatCard title="결제 실패율">
      <p className="text-3xl font-bold text-red-500">{`${failureRate}%`}</p>
      <p className="text-gray-500">
        {`전체 ${totalCount.toLocaleString()}건 중 ${failedCount.toLocaleString()}건 실패`}
      </p>
      <Link
        href={`${ROUTES.PAYMENTS}?status=FAILED`}
        className="self-end text-sm text-gray-500"
      >
        상세 보기 &gt;
      </Link>
    </StatCard>
  );
};
