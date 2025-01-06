import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { SessionService } from './session.service';
import { LOCALSTORAGE_STATE } from '../custom-lib/oauth2-auth-code-PKCE';
import { tap, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const sessionService = this.injector.get(SessionService);

        let accessToken: string | null = null;

        try {
            const authState = localStorage.getItem(LOCALSTORAGE_STATE);
            if (authState) {
                const authInfo = JSON.parse(authState);
                accessToken = authInfo?.accessToken?.value || null;
            }
        } catch (error) {
            console.warn('Failed to parse auth state from localStorage:', error);
        }

        if (this.isInvalidToken(accessToken)) {
            this.logoutV2(sessionService, 'You are not logged in');
            return throwError(() => new Error('Access token not found'));
        }

        return next.handle(this.customRequest(request, accessToken!)).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('Successful response:', event);
                }
            }),
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handleUnauthorizedError(request, next, sessionService);
                }
                return throwError(() => error);
            })
        );
    }

    private handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler, sessionService: SessionService): Observable<HttpEvent<any>> {
        return sessionService.renewToken().pipe(
            switchMap(() => {
                let newAccessToken: string | null = null;
                try {
                    const authState = localStorage.getItem(LOCALSTORAGE_STATE);
                    if (authState) {
                        const authInfo = JSON.parse(authState);
                        newAccessToken = authInfo?.accessToken?.value || null;
                    }
                } catch (error) {
                    console.warn('Failed to parse refreshed auth state:', error);
                }

                if (this.isInvalidToken(newAccessToken)) {
                    this.logoutV2(sessionService, 'You are not logged in');
                    return throwError(() => new Error('Access token not found after refresh'));
                }

                return next.handle(this.customRequest(request, newAccessToken!));
            }),
            catchError((refreshError: any) => {
                console.error('Token refresh failed:', refreshError);
                this.logoutV2(sessionService, 'Your session has expired. Please login again.', true);
                return throwError(() => refreshError);
            })
        );
    }

    isInvalidToken(token: string | null): boolean {
        return !token || token.trim().length === 0;
    }

    customRequest(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    logoutV2(sessionService: SessionService, logoutMessage: string, hasSessionExpired: boolean = false): void {
        const router = this.injector.get(Router);
        sessionService.redirectUrl = router.url;
        sessionService.logoutMessage = logoutMessage;
        sessionService.hasSessionExpired = hasSessionExpired;
        sessionService.logoutV2();
    }
}
