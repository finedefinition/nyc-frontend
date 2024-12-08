import { Suspense } from 'react';
import Breadcrumb from '@/components/MainLayout/Breadcrumbs';
import Loading from '../loading';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumb />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
