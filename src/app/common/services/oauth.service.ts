import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { authorizationServerUrl } from '../constants/server-settings';
import { OAuth2AuthCodePKCE } from '../custom-lib/oauth2-auth-code-PKCE';

@Injectable()
export class OAuth2Service {
  private isBrowser: boolean;
  public oAuth2: OAuth2AuthCodePKCE;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Initialize oAuth2 with platformId
    this.oAuth2 = new OAuth2AuthCodePKCE(
      {
        authorizationUrl: `${authorizationServerUrl}/oauth/authorize`,
        tokenUrl: `${authorizationServerUrl}/oauth/token`,
        clientId: 'web',
        scopes: ['read'],
        redirectUrl: this.isBrowser ? `${window.location.origin}/login/` : '', // Safe to use window here
        onAccessTokenExpiry: (refreshAccessToken) => {
          return refreshAccessToken();
        },
        onInvalidGrant: (refreshAuthCodeOrRefreshToken) => {
          // Handle refresh token logic if needed
        }
      },
      this.platformId // Pass platformId as the second argument
    );
  }

  someMethod() {
    if (this.isBrowser) {
      const currentUrl = window.location.href;
      console.log(currentUrl);
    }
  }
}
