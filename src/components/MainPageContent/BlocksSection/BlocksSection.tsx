import { BlocksSectionData } from '@/data/mainPage/BlocksSectionData';

import { Block } from './Block';
import { AnimatedBlock } from './AnimatedBlock';

export const BlocksSection = () => {
  return (
    <>
      {BlocksSectionData.map((block, i) => (
        <AnimatedBlock
          key={i}
          direction={i % 2 === 0 ? 'left' : 'right'}
          delay={i * 0.15}
        >
          <Block data={block} />
        </AnimatedBlock>
      ))}
    </>
  );
};
