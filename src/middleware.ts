import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (token) {
    // eslint-disable-next-line no-console
    console.log(token, 'middleware token');
  }

  return NextResponse.next();
}
