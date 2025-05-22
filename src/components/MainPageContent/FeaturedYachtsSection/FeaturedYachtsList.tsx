
import { CardSkeleton } from '@/components/Skeletons/CardSkeleton';

import { apiClient } from '@/utils/api/apiClient';

import { Yacht } from '@/interfaces/yacht.interface';
import { CatalogueCard } from '@/components/Catalogue/Card/Card';

const FEATURED_YACHT_COUNT = 3;

export const FeaturedYachtsList = async () => {
  try {
    const featuredYachts: Yacht[] =
      await apiClient.getFeaturedYachts('/yachts/featured');

    return (
      <>
        {featuredYachts.map((yacht) => (
          <CatalogueCard
            key={yacht.yacht_id}
            yacht={yacht}
          />
        ))}
      </>
    );
  } catch (error) {
    return (
      <>
        {Array.from({ length: FEATURED_YACHT_COUNT }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </>
    );
  }
};
