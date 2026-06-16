import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest): NextResponse {
  // Auth handling is managed client-side via AuthGuard for this demo.
  // In a real deployment, validate httpOnly cookie here.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
