'use client';

import { useGetPaymentStatusQuery } from '@/api/common/queries';
import { PaymentStatus } from '@/api/type';
import { getStatusStyle } from '@/constants/payments';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

export const PaymentStatusBadge = ({
  status,
  className = '',
}: PaymentStatusBadgeProps) => {
  const { data: paymentStatusMap = {} } = useGetPaymentStatusQuery();
  const statusKor = paymentStatusMap[status] || status;
  const statusStyle = getStatusStyle(status);

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs ${statusStyle} ${className}`}
    >
      {statusKor}
    </span>
  );
};
