// api/auth/user/route.ts
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  const authResult = await verifyAuth();
  
  if (!authResult.isAuthenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ user: authResult.userData.user });
  
  // Set new access token cookie if refreshed
  if (authResult.newAccessToken) {
    response.cookies.set('accessToken', authResult.newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
  }

  return response;
}