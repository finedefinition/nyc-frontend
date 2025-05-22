import { useRouter, usePathname } from 'next/navigation';
import { ClickableComponent } from '@/components/ClickableComponent/ClickableComponent';
import { Menu } from '@/components/SvgIcons/Menu';
import { Close } from '@/components/SvgIcons/Close';

export const MenuAndCloseButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const closeModal = () => {
    router.back();
  };
  return (
    <>
      {pathname.includes('menu') ? (
        <ClickableComponent
          type="button"
          onClick={closeModal}
        >
          <Close />
        </ClickableComponent>
      ) : (
        <ClickableComponent href="/menu">
          <Menu />
        </ClickableComponent>
      )}
    </>
  );
};
