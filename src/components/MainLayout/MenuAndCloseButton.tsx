import { useRouter } from 'next/navigation';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import Menu from '@/components/SvgIcons/Menu';
import Close from '@/components/SvgIcons/Close';

type MenuAndCloseButtonProps = {
  modal: string | null;
};

const MenuAndCloseButton = ({ modal }: MenuAndCloseButtonProps) => {
  const router = useRouter();
  const closeModal = () => {
    router.back();
  };
  return (
    <>
      {modal === 'mobileMenu' ? (
        <ClickableComponent
          type="button"
          onClick={closeModal}
        >
          <Close />
        </ClickableComponent>
      ) : (
        <ClickableComponent href="?modal=mobileMenu">
          <Menu />
        </ClickableComponent>
      )}
    </>
  );
};

export default MenuAndCloseButton;
