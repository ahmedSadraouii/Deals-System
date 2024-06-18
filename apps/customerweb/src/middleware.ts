// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const USERNAME = 'demo';
const PASSWORD = 'DealsDemo420!';

function checkBasicAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return false;
  }

  const auth = authHeader.split(' ')[1];
  const [username, password] = Buffer.from(auth, 'base64')
    .toString()
    .split(':');

  return username === USERNAME && password === PASSWORD;
}

export const config = {
  matcher: '/',
};

export function middleware(request: NextRequest) {
  if (!checkBasicAuth(request)) {
    const response = new NextResponse('Unauthorized', { status: 401 });
    response.headers.set('WWW-Authenticate', 'Basic realm="Secure Area"');
    return response;
  }

  return NextResponse.next();
}
