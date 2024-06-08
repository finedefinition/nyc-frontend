import Header from '@/components/Header/Header';
import FeaturedYachts from '@/components/FeaturedYachts/FeaturedYachts';
import AllSectionComponents from '@/components/SectionComponent/SectionComponent';
import ContactSection from '@/components/ContactSection/ContactSection';
import ReviewsSection from '@/components/ReviewsSection/ReviewsSection';

import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <FeaturedYachts />
        <AllSectionComponents />
        <ContactSection />
        <ReviewsSection />
      </main>
    </>
  );
}
