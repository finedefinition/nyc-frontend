import Image from 'next/image';
import ContactSectionImg from '@/public/contact_img.png';
import typo from '@/styles/typography.module.scss';
import ContactForm from '../ContactForm/ContactForm';
import styles from './contactSection.module.scss';

const ContactSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.section_container}>
        <div className={styles.section_container__img}>
          <Image
            src={ContactSectionImg}
            className={styles.image}
            fill
            sizes="100vw"
            alt="Contact Form Image"
          />
        </div>
        <div className={styles.section_container__form}>
          <h4 className={`${typo.typo_h4} ${typo.typo_h4__white}`}>
            Have Questions? Contact Us
          </h4>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
