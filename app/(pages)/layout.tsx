import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadCrumbs />
      {children}
    </>
  );
};
