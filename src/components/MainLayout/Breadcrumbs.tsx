'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  capitalizeFirstLetter,
  convertPathToSegments,
  createHrefFromSegment,
  replaceLastSegment,
} from '@/utils/breadcrumbs/helpers';
import ClickableComponent from '../ClickableComponent/ClickableComponent';
import Home from '../SvgIcons/Home';
import RightArrow from '../SvgIcons/RightArrow';

const Breadcrumb = () => {
  const pathname = usePathname();
  const search = useSearchParams();
  const yachtName = search.get('name');

  const segments = convertPathToSegments(pathname);

  if (yachtName) {
    replaceLastSegment(segments, yachtName);
  }

  const normalizeSegments = segments.map((segment) =>
    capitalizeFirstLetter(segment)
  );

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
          className={`text-primary hover:text-secondary-100 mr-4 transition ${isLastSegment ? 'text-grey-50 pointer-events-none' : ''}`}
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
