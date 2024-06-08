import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SocialMediaIcons from '@/components/SocialMediaIcons/SocialMediaIcons';
import typo from '@/styles/typography.module.scss';
import styles from '@/components/Navbar/ContactsModal/contactsModal.module.scss';
import Copy from '@/public/icons/copy.svg';
import Close from '@/public/icons/close.svg';

type Props = {
  isContactsModalOpen: boolean;
  contactsModalHandler: () => void;
};

const ContactsModal = ({
  isContactsModalOpen,
  contactsModalHandler,
}: Props) => {
  const pathname = usePathname();
  const tel1 = '+353874375161';
  const color = '#4D6575';

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert(`${text} is copied to clipboard`);
      },
      () => {
        try {
          window.prompt('Please copy this text', text);
        } catch (error) {
          alert("Your browser doesn't support this function");
        }
      }
    );
  };

  return (
    <div
      className={`${styles.modal} ${isContactsModalOpen ? styles.open : ''}`}
    >
      <div className={styles.modal__wrapper}>
        <div className={styles.modal__content}>
          <Link
            href={pathname}
            onClick={contactsModalHandler}
            className={styles.close}
          >
            <Image
              src={Close}
              alt="Close"
            />
          </Link>
          <h4 className={typo.typo_h4}>Contacts</h4>
          <div className={styles.phone}>
            <a href={`tel:${tel1}`}>{tel1}</a>
            <button onClick={() => copyText(tel1)}>
              <Image
                src={Copy}
                alt="Copy"
              />
            </button>
          </div>
          <div className={styles.social}>
            <SocialMediaIcons color={color} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsModal;
