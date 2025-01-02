import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AccessContext, OAuth2AuthCodePKCE } from '../custom-lib/oauth2-auth-code-PKCE';
import { authorizationServerUrl } from '../constants/server-settings';

@Injectable()
export class OAuth2Service {


    public getAccessToken(): Promise<AccessContext> {
        return this.oAuth2.getAccessToken();
    }
    

    oAuth2: OAuth2AuthCodePKCE;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        // Only run this part in the browser
        if (isPlatformBrowser(this.platformId)) {
            const redirectUrl = `${window.location.origin}/login/`;

            this.oAuth2 = new OAuth2AuthCodePKCE({
                authorizationUrl: `${authorizationServerUrl}/oauth/authorize`,
                tokenUrl: `${authorizationServerUrl}/oauth/token`,
                clientId: 'web',
                scopes: ['read'],
                redirectUrl: redirectUrl,
                onAccessTokenExpiry: (refreshAccessToken) => {
                    return refreshAccessToken();
                },
                onInvalidGrant: (refreshAuthCodeOrRefreshToken) => {
                    // Handle invalid grant here if needed
                }
            });
        } else {
            // SSR environment, initialize with fallback or empty URL
            this.oAuth2 = new OAuth2AuthCodePKCE({
                authorizationUrl: `${authorizationServerUrl}/oauth/authorize`,
                tokenUrl: `${authorizationServerUrl}/oauth/token`,
                clientId: 'web',
                scopes: ['read'],
                redirectUrl: '/login/',
                onAccessTokenExpiry: (refreshAccessToken) => {
                    return refreshAccessToken();
                },
                onInvalidGrant: (refreshAuthCodeOrRefreshToken) => {
                    // Handle invalid grant for SSR context
                }
            });
        }
    }
}
