import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verifica se a rota é /home
  if (request.nextUrl.pathname.startsWith('/home')) {
    // Tenta pegar o cookie ou algo do localStorage? Não podemos acessar localStorage no middleware.
    // Então faremos uma verificação via cookie. Vamos usar um cookie chamado 'auth'
    const authCookie = request.cookies.get('auth');
    
    if (!authCookie) {
      // Redireciona para a landing
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*'],
};