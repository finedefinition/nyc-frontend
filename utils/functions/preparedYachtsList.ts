import { Vessel } from "@/interfaces/vessel.interface";

type SearchParams = {
  [key: string]: string;
};

export const preparedYachtsList = (
  yachts: Vessel[],
  params: SearchParams = {},
): Vessel[] => {
  const newYachtsArr = [...yachts].filter( item => {
    const top = params?.top ? item.yacht_top : true;
    const price = params?.hotPrice ? item.yacht_hot_price : true;
    const vat = params?.vat ? item.yacht_vat : true;

    return top && price && vat;
  });

  if (params.sort) {
    newYachtsArr.sort((a, b) => {
      switch (params.sort) {
        case 'priceDecrease':
          return +b.yacht_price - +a.yacht_price;
        
        case 'priceIncrease':
          return +a.yacht_price - +b.yacht_price;
        
        case 'yearIncrease':
          return a.yacht_year - b.yacht_year;
  
        case 'yearDecrease':
          return b.yacht_year - a.yacht_year;
  
        case 'leastPopular': 
          return +a.yacht_favourites_count - +b.yacht_favourites_count;
  
        case 'mostPopular': 
          return +b.yacht_favourites_count - +a.yacht_favourites_count;
        
        default:
          return 0;
      }
    });
  }

  return newYachtsArr;
};
