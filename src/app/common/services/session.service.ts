import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { from } from 'rxjs';

import { resourceServerUrl } from '../constants/server-settings';
import { getHttpHeaders } from '../constants/constants';
import { OAuth2Service } from './auth.service';

@Injectable()
export class SessionService {
    public redirectUrl!: string;
    public logoutMessage!: string;
    public hasSessionExpired: boolean = false;

    constructor(private router: Router, private oAuth2Service: OAuth2Service, private http: HttpClient) {}

    // Renews the token by exchanging a refresh token for an access token
    renewToken(): Observable<any> {
        return from(this.oAuth2Service.oAuth2.exchangeRefreshTokenForAccessToken());
    }

    // Calls an API to revoke the current session
    revokeToken(): Observable<HttpResponse<any>> {
        return this.http.put(`${resourceServerUrl}/v1/user/sessions/logout`, {}, { headers: getHttpHeaders(), observe: 'response' });
    }

    // Logs out the user by revoking the token and calling logoutV2
    logout(): void {
        this.revokeToken().subscribe(
            response => {
                if (response.status === 200) {
                    this.logoutV2();
                }
            },
            err => {
                console.error('Error during token revocation', err);
                this.logoutV2(); // Proceed with logout even if revocation fails
            }
        );
    }

    // Safely handles logout by clearing session data
    logoutV2(): void {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            // Safe to use localStorage in the browser
            localStorage.removeItem('YOUR_ITEM_KEY'); // Example of removing a specific item
        } else {
            // Handle case when localStorage is not available (e.g., in SSR environment)
            console.warn('localStorage is not available in SSR environment');
        }

        // Clear all localStorage data (consider if you need this)
        if (typeof window !== 'undefined') {
            localStorage.clear(); // Clear all stored items in localStorage
        }

        // Redirect to the login page or a session expired page
        this.router.navigate(['/login']);
    }
    

    // Navigates to the appropriate page based on session status
    logoutNavigate(): void {
        if (this.hasSessionExpired) {
            this.router.navigate(['/session-expired']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}
