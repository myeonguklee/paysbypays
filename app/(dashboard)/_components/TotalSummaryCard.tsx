'use client';

import Link from 'next/link';
import { paymentList } from '@/app/mock';
import { ROUTES } from '@/constants/Routes';
import { StatCard } from './StatCard';

const calculateTotalSummary = () => {
  const successPayments = paymentList.filter(
    (payment) => payment.status === 'SUCCESS'
  );

  const totalVolumeAll = successPayments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  const totalCountAll = successPayments.length;

  return {
    totalVolumeAll,
    totalCountAll,
  };
};

export const TotalSummaryCard = () => {
  const { totalVolumeAll, totalCountAll } = calculateTotalSummary();

  return (
    <StatCard title="전체 누적 거래">
      <p className="text-3xl font-bold">{totalVolumeAll.toLocaleString()}원</p>
      <p className="text-gray-500">총 {totalCountAll.toLocaleString()} 건</p>
      <Link href={ROUTES.PAYMENTS} className="self-end text-sm text-gray-500">
        상세 보기 &gt;
      </Link>
    </StatCard>
  );
};
