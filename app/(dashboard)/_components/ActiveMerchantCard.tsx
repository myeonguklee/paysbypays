'use client';

import Link from 'next/link';
import { useGetMerchantsListQuery } from '@/api/merchants/queries';
import { Merchant } from '@/api/merchants/type';
import { ROUTES } from '@/constants/Routes';
import { StatCard } from './StatCard';

type ActiveMerchantStats = {
  totalMerchants: number;
  activeMerchants: number;
  activeRate: number;
};

const calculateActiveMerchantStats = (
  merchantsList: Merchant[]
): ActiveMerchantStats => {
  const totalMerchants = merchantsList.length;
  const activeMerchants = merchantsList.filter(
    (merchant) => merchant.status === 'ACTIVE'
  ).length;

  if (totalMerchants === 0) {
    return {
      totalMerchants: 0,
      activeMerchants: 0,
      activeRate: 0,
    };
  }

  const activeRate = (activeMerchants / totalMerchants) * 100;

  return {
    totalMerchants,
    activeMerchants,
    activeRate,
  };
};

export const ActiveMerchantCard = () => {
  const { data: merchantsList = [] } = useGetMerchantsListQuery();
  const activeMerchantStats = calculateActiveMerchantStats(merchantsList);

  return (
    <StatCard title="활성 가맹점">
      <p className="text-3xl font-bold">
        {activeMerchantStats.activeMerchants.toLocaleString()}개
      </p>

      <p className="text-gray-500">
        {`전체 ${activeMerchantStats.totalMerchants.toLocaleString()}개 중 ${activeMerchantStats.activeRate.toFixed(1)}% 활성`}
      </p>
      <div className="flex items-center gap-4">
        <div className="h-4 flex-1 rounded-full bg-gray-200">
          <div
            className="h-4 rounded-full bg-emerald-500"
            style={{
              width: `${Math.min(activeMerchantStats.activeRate, 100)}%`,
            }}
          />
        </div>

        <Link
          href={ROUTES.MERCHANTS}
          className="self-end text-sm text-gray-500"
        >
          상세 보기 &gt;
        </Link>
      </div>
    </StatCard>
  );
};
