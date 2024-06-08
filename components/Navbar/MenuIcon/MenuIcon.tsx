import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BurgerMenu from '@/public/icons/burger__menu.svg';
import Close from '@/public/icons/close.svg';

type Props = {
  isMobileMenuClose: boolean;
  mobileMenuHandler: () => void;
};

const MenuIcon = ({ isMobileMenuClose, mobileMenuHandler }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={pathname}
      onClick={mobileMenuHandler}
    >
      {isMobileMenuClose ? (
        <Image
          src={Close}
          alt="Close"
        />
      ) : (
        <Image
          src={BurgerMenu}
          alt="Burger Menu"
        />
      )}
    </Link>
  );
};

export default MenuIcon;
