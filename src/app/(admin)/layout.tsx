import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import Breadcrumb from '@/components/MainLayout/Breadcrumbs';
import NavbarFooterLogo from '@/components/SvgIcons/NavbarFooterLogo';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="flex justify-center items-center pt-4 md:pt-6 xl:pt-8 px-5 md:px-16">
        <ClickableComponent href="/">
          <NavbarFooterLogo navbar />
        </ClickableComponent>
      </nav>
      <Breadcrumb />
      {children}
    </>
  );
}
