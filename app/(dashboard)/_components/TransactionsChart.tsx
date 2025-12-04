'use client';

import { useMemo, useState } from 'react';
import {
  eachDayOfInterval,
  endOfDay,
  format,
  isWithinInterval,
  startOfDay,
  subDays,
} from 'date-fns';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetPaymentStatusQuery } from '@/api/common/queries';
import { useGetPaymentsListQuery } from '@/api/payments/queries';
import { convertToKRW } from '@/utils/currency';
import { FilterButton } from './FilterButton';

type RangeOption = '1w' | '1m' | '3m';
type MetricType = 'amount' | 'count';

const rangeDays = {
  '1w': 7,
  '1m': 30,
  '3m': 90,
};

export const TransactionsChart = () => {
  const [range, setRange] = useState<RangeOption>('1m');
  const [metric, setMetric] = useState<MetricType>('amount');
  const { data: paymentList = [] } = useGetPaymentsListQuery();
  const { data: paymentStatusMap = {} } = useGetPaymentStatusQuery();

  const { data, yMax } = useMemo(() => {
    const endDate = new Date();
    const startDate = subDays(endDate, rangeDays[range] - 1);

    const interval = { start: startOfDay(startDate), end: endOfDay(endDate) };

    const filteredPayments = paymentList.filter((p) =>
      isWithinInterval(new Date(p.paymentAt), interval)
    );

    const dailyData: Record<
      string,
      {
        successAmount: number;
        successCount: number;
        cancelledAmount: number;
        cancelledCount: number;
        failedAmount: number;
        failedCount: number;
      }
    > = {};
    const daysInInterval = eachDayOfInterval(interval);

    daysInInterval.forEach((day) => {
      const formattedDate = format(day, 'MM-dd');
      dailyData[formattedDate] = {
        successAmount: 0,
        successCount: 0,
        cancelledAmount: 0,
        cancelledCount: 0,
        failedAmount: 0,
        failedCount: 0,
      };
    });

    filteredPayments.forEach((p) => {
      const day = format(new Date(p.paymentAt), 'MM-dd');
      const target = dailyData[day];
      if (!target) return;

      const amount = convertToKRW(Number(p.amount), p.currency);

      if (p.status === 'SUCCESS') {
        target.successAmount += amount;
        target.successCount += 1;
      } else if (p.status === 'CANCELLED') {
        target.cancelledAmount += amount;
        target.cancelledCount += 1;
      } else if (p.status === 'FAILED') {
        target.failedAmount += amount;
        target.failedCount += 1;
      }
    });

    const chartData = daysInInterval.map((day) => {
      const formattedDate = format(day, 'MM-dd');
      return {
        date: formattedDate,
        ...dailyData[formattedDate],
      };
    });

    const statusKeys =
      metric === 'amount'
        ? ['successAmount', 'cancelledAmount', 'failedAmount']
        : ['successCount', 'cancelledCount', 'failedCount'];

    const maxVal =
      chartData.length > 0
        ? Math.max(
            ...chartData.flatMap((d) =>
              statusKeys.map((key) => d[key as keyof typeof d] as number)
            )
          )
        : 0;

    const calculatedYMax =
      maxVal > 0 ? Math.ceil(maxVal * 1.2) : metric === 'amount' ? 100000 : 10;

    return {
      data: chartData,
      yMax: calculatedYMax,
    };
  }, [range, metric, paymentList]);

  const successDataKey = metric === 'amount' ? 'successAmount' : 'successCount';
  const cancelledDataKey =
    metric === 'amount' ? 'cancelledAmount' : 'cancelledCount';
  const failedDataKey = metric === 'amount' ? 'failedAmount' : 'failedCount';

  return (
    <section>
      <h3 className="text-muted-foreground mb-4 text-lg font-medium">
        거래 내역 통계
      </h3>
      <div className="flex h-96 flex-col rounded-lg border border-gray-100 p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-md bg-gray-200 p-1">
            {(['amount', 'count'] as MetricType[]).map((m) => (
              <FilterButton
                key={m}
                isActive={metric === m}
                onClick={() => setMetric(m)}
              >
                {m === 'amount' ? '거래금액' : '거래 건수'}
              </FilterButton>
            ))}
          </div>

          <div className="flex items-center gap-1 rounded-md bg-gray-200 p-1">
            {(['1w', '1m', '3m'] as RangeOption[]).map((r) => (
              <FilterButton
                key={r}
                isActive={range === r}
                onClick={() => setRange(r)}
              >
                {r === '1w' ? '1주일' : r === '1m' ? '1개월' : '3개월'}
              </FilterButton>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid vertical={false} horizontal={true} />
            <XAxis dataKey="date" tickLine={true} tickMargin={8} />
            <YAxis
              tickFormatter={(value) =>
                metric === 'amount'
                  ? `${(value / 10000).toLocaleString()}만`
                  : `${value}건`
              }
              tickLine={false}
              domain={[0, yMax]}
            />
            <Tooltip
              formatter={(value, name) => {
                if (typeof value !== 'number') return [value, name];
                if (metric === 'amount') {
                  return [`${(value / 10000).toLocaleString()}만원`, name];
                }
                return [`${value.toLocaleString()}건`, name];
              }}
            />
            <Legend />
            <Line
              type="linear"
              dataKey={successDataKey}
              stroke="#0064FF"
              name={paymentStatusMap.SUCCESS || '결제 완료'}
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="linear"
              dataKey={cancelledDataKey}
              stroke="#FF6B35"
              name={paymentStatusMap.CANCELLED || '환불 완료'}
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="linear"
              dataKey={failedDataKey}
              stroke="#6B7280"
              name={paymentStatusMap.FAILED || '결제 실패'}
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
