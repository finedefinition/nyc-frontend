'use client';
import { createHrefFromSegment } from '@/utils/breadcrumbs/helpers';

import useBreadcrumbs from '@/hooks/useBreadcrumbs';
import ClickableComponent from '../ClickableComponent/ClickableComponent';
import Home from '../SvgIcons/Home';
import RightArrow from '../SvgIcons/RightArrow';

const Breadcrumb = () => {
  const [segments, normalizeSegments] = useBreadcrumbs();

  const renderSegment = (segment: string, index: number) => {
    const href = createHrefFromSegment(segments, index);
    const isLastSegment = index === normalizeSegments.length - 1;

    return (
      <div
        key={index}
        className="flex items-center"
      >
        <ClickableComponent
          href={href}
          className={`hover:text-secondary-100 mr-4 transition ${isLastSegment ? 'text-grey-50 pointer-events-none' : 'text-primary'}`}
        >
          {segment}
        </ClickableComponent>
        {!isLastSegment && <RightArrow className="fill-primary" />}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap items-center space-x-1 md:space-x-4 px-5 md:px-16 py-4 md:py-6 xl:py-8">
      <ClickableComponent href="/">
        <Home />
      </ClickableComponent>
      <RightArrow className="fill-primary" />
      {normalizeSegments.map(renderSegment)}
    </div>
  );
};

export default Breadcrumb;
