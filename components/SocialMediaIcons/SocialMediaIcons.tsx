import Link from 'next/link';
import InstagramSvg from '@/components/SvgIconsComponents/InstagramSvg';
import TelegramSvg from '@/components/SvgIconsComponents/TelegramSvg';
import WhatsAppSvg from '@/components/SvgIconsComponents/WhatsAppSvg';
import styles from './socialMediaIcons.module.scss';

type Props = {
  color: string;
};

const SocialMediaIcons = ({ color }: Props) => {
  return (
    <>
      <Link
        href="https://www.instagram.com/norseyachtcom/"
        target="_blank"
        className={styles.icon}
      >
        <InstagramSvg color={color} />
      </Link>
      <Link
        href="https://t.me/norseyacht"
        target="_blank"
        className={styles.icon}
      >
        <TelegramSvg color={color} />
      </Link>
      <Link
        href="https://chat.whatsapp.com/HEclUDIVs1h4Ht5hJzXu0Q"
        target="_blank"
        className={styles.icon}
      >
        <WhatsAppSvg color={color} />
      </Link>
    </>
  );
};

export default SocialMediaIcons;
