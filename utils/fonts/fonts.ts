import { Bai_Jamjuree, Roboto } from 'next/font/google';
import BeautifulEs from 'next/font/local';

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const baiJamjuree = Bai_Jamjuree({
  weight: ['400', '500', '600', '700'],
  variable: '--font-baiJamjuree',
  subsets: ['latin'],
});

export const beautifulEs = BeautifulEs({
  src: '../../public/font/Beautiful_ES.ttf',
  variable: '--font-bEs',
});
