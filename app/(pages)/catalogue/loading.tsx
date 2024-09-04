import CardSkeleton from "@/components/CardSkeleton/CardSkeleton";

import typo from "@/styles/typography.module.scss";
import styles from './page.module.scss';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className={styles.catalog_container}>
      <div className={styles.catalog__top}>
        <h4 className={`${styles.catalog_title} ${typo.typo_h4}`}>Catalogue</h4>
        {/* <div className="d-flex">
          Filter & Sorting
        </div> */}
      </div>
      <div className={`cards_container`}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </section>
  )
}
