'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRef, useEffect } from 'react';
import {
  capitalizeFirstLetter,
  convertPathToSegments,
  replaceLastSegment,
} from '@/utils/breadcrumbs/helpers';

let cnt = 0;

const useBreadcrumbs = () => {
  const pathname = usePathname();
  const search = useSearchParams();
  const yachtName = search.get('name');

  cnt = cnt + 1;

  const segments = convertPathToSegments(pathname);

  if (yachtName) {
    replaceLastSegment(segments, yachtName);
  }

  const normalizeSegments = segments.map((segment) =>
    capitalizeFirstLetter(segment)
  );

  const prevSegmentsRef = useRef<string[]>([]);
  const prevNormalizeSegmentsRef = useRef<string[]>([]);

  const excludedRoutes = ['signin', 'signup', 'contactform'];
  const isExcludedRoute = excludedRoutes.some((route) =>
    pathname.includes(route)
  );

  useEffect(() => {
    if (!isExcludedRoute) {
      prevSegmentsRef.current = segments;
      prevNormalizeSegmentsRef.current = normalizeSegments;
    }
  }, [pathname, segments, normalizeSegments, isExcludedRoute]);

  if (isExcludedRoute) {
    return [prevSegmentsRef.current, prevNormalizeSegmentsRef.current];
  }

  return [segments, normalizeSegments];
};

export default useBreadcrumbs;
