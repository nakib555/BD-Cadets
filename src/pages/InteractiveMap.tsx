import React, { Suspense } from 'react';
import PageSkeleton from '../components/PageSkeleton';

const InteractiveMapContent = React.lazy(() => import('./InteractiveMapContent'));

export default function InteractiveMap() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <InteractiveMapContent />
    </Suspense>
  );
}
