export const sortFields = [
  {
    name: 'Low to High price',
    href: '?orderBy=asc&sortBy=yacht_price',
  },
  {
    name: 'High to Low price',
    href: '?orderBy=desc&sortBy=yacht_price',
  },
  {
    name: 'Newest to Oldest',
    href: '?orderBy=desc&sortBy=yacht_created_at',
  },
  {
    name: 'Oldest to Newest',
    href: '?orderBy=asc&sortBy=yacht_created_at',
  },
  {
    name: 'Most Popular',
    href: '?orderBy=desc&sortBy=yacht_favourites_count',
  },
  {
    name: 'Least Popular',
    href: '?orderBy=asc&sortBy=yacht_favourites_count',
  },
];
