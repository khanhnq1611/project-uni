// lib/auth.ts
import Cookies from 'js-cookie';

interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

interface AuthResult {
  isAuthenticated: boolean;
  userData?: any;
  newAccessToken?: string;
}

export const getTokens = (): Tokens => {
  return {
    accessToken: Cookies.get('accessToken'),
    refreshToken: Cookies.get('refreshToken')
  };
};

const setCookie = (name: string, value: string): void => {
  Cookies.set(name, value, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
};

const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
  try {
    const response = await fetch('https://apirelu.vietrux.id.vn/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) return null;
    
    const { accessToken } = await response.json();
    if (!accessToken) return null;
    
    setCookie('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

export const verifyAuth = async (): Promise<AuthResult> => {
  try {
    let { accessToken, refreshToken } = getTokens();
    if (!accessToken || !refreshToken) return { isAuthenticated: false };

    // First attempt with current access token
    let verifyResponse = await fetch('https://apirelu.vietrux.id.vn/auth/verify', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    // If token is invalid, try refresh
    if (!verifyResponse.ok) {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (!newAccessToken) return { isAuthenticated: false };
      
      accessToken = newAccessToken;
      verifyResponse = await fetch('https://apirelu.vietrux.id.vn/auth/verify', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      
      if (!verifyResponse.ok) return { isAuthenticated: false };
    }

    // Fetch user data with valid token
    const userResponse = await fetch('https://apirelu.vietrux.id.vn/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!userResponse.ok) return { isAuthenticated: false };
    
    const userData = await userResponse.json();
    console.log('userData:', userData);
    const currentTokens = getTokens();
    return { 
      isAuthenticated: true, 
      userData,
      newAccessToken: accessToken !== currentTokens.accessToken ? accessToken : undefined
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { isAuthenticated: false };
  }
};