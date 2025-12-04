import { Suspense } from 'react';
import MerchantsPageContent from './_components/MerchantsPageContent';
import MerchantsPageSkeleton from './_components/MerchantsPageSkeleton';

export default function MerchantsPage() {
  return (
    <Suspense fallback={<MerchantsPageSkeleton />}>
      <MerchantsPageContent />
    </Suspense>
  );
}
