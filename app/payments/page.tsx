import { Suspense } from 'react';
import PaymentsPageContent from './_components/PaymentsPageContent';
import PaymentsPageSkeleton from './_components/PaymentsPageSkeleton';

export default function PaymentsPage() {
  return (
    <Suspense fallback={<PaymentsPageSkeleton />}>
      <PaymentsPageContent />
    </Suspense>
  );
}
