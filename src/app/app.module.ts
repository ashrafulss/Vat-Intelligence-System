import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { OAuth2Service } from './common/services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { SessionService } from './common/services/session.service';
import { AuthInterceptor } from './common/services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
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
      useClass: AuthInterceptor,  // Provide the interceptor
      multi: true               // Ensures multiple interceptors can be used if needed
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
