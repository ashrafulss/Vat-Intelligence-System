import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './common/components/navbar/navbar.component';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './auth/home/home.component';
import { SessionService } from './common/services/session.service';
import { OAuth2Service } from './common/services/oauth.service';
import { TokenInterceptorService } from './common/services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    OAuth2Service, 
    SessionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
  }

 

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
