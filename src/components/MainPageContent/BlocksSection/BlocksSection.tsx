import { BlocksSectionData } from '@/data/mainPage/BlocksSectionData';

import { Block } from './Block';

export const BlocksSection = () => {
  return (
    <>
      {BlocksSectionData.map((block, i) => (
        <Block
          key={i}
          data={block}
        />
      ))}
    </>
  );
};
