import { PaymentStatus } from '@/api/type';
import { paymentStatusMap } from '@/app/mock';
import { getStatusStyle } from '@/constants/payments';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

export const PaymentStatusBadge = ({
  status,
  className = '',
}: PaymentStatusBadgeProps) => {
  const statusKor = paymentStatusMap[status as Exclude<PaymentStatus, string>];
  const statusStyle = getStatusStyle(status);

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs ${statusStyle} ${className}`}
    >
      {statusKor}
    </span>
  );
};
