// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const USERNAME = 'demo';
const PASSWORD = 'DealsDemo420!';

function checkBasicAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    console.log('No authorization header found');
    return false;
  }

  const auth = authHeader.split(' ')[1];
  const [username, password] = Buffer.from(auth, 'base64')
    .toString()
    .split(':');

  const result = username === USERNAME && password === PASSWORD;

  console.log('User input matched', result);

  return result;
}

export const config = {
  matcher: '/((?!api|_next|static|public|favicon.ico).*)',
};

export function middleware(request: NextRequest) {
  console.log('Basic auth middleware, start', process.env.NODE_ENV);

  if (process.env.NODE_ENV !== 'production') {
    console.log('Skipping middleware...');
    return NextResponse.next();
  }

  if (!checkBasicAuth(request)) {
    const response = new NextResponse('Unauthorized', { status: 401 });
    response.headers.set('WWW-Authenticate', 'Basic realm="Secure Area"');
    return response;
  }

  return NextResponse.next();
}
