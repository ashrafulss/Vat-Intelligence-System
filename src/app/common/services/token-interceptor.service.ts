import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OAuth2Service } from './auth.service'; // Assuming you have an AuthService for token management

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: OAuth2Service, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the access token from the AuthService or wherever it's stored
    const token = this.authService.getAccessToken();

    // Clone the request to add the Authorization header if a token is available
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pass the modified request to the next interceptor or HTTP handler
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Handle unauthorized error globally (e.g., redirect to login page)
          this.router.navigate(['/login']);
        }
        // If there's another error, just throw it
        throw error;
      })
    );
  }
}
