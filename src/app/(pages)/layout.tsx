import { Breadcrumb } from '@/components/MainLayout/Breadcrumbs';
import { Footer } from '@/components/MainLayout/Footer';
import { Navbar } from '@/components/MainLayout/Navbar/Navbar';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      {children}
      <Footer />
    </>
  );
}
