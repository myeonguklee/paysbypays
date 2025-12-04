interface PaymentAmountProps {
  amount: string | number;
  currency: string;
  className?: string;
}

export const PaymentAmount = ({
  amount,
  currency,
  className = '',
}: PaymentAmountProps) => {
  return (
    <span
      className={className}
    >{`${Number(amount).toLocaleString()} ${currency}`}</span>
  );
};
