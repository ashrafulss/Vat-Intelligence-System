import { Component, OnInit } from '@angular/core';
import { OAuth2AuthCodePKCE } from '../../common/custom-lib/oauth2-auth-code-PKCE';

import { OAuth2Service } from '../../common/services/oauth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Corrected 'styleUrl' to 'styleUrls'
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = false;
  public oAuth2Obj!: OAuth2AuthCodePKCE;

  constructor(private router: Router, private oAuth2Service: OAuth2Service) {
  }

  ngOnInit() {
      this.oAuth2Obj = this.oAuth2Service.oAuth2;
      this.oAuth2Obj.isReturningFromAuthServer().then(hasAuthCode => {
          if (!hasAuthCode) {
              this.oAuth2Obj.fetchAuthorizationCode();
          }

          return this.oAuth2Obj.getAccessToken().then((data) => {        
              this.isLoading = true;
              this.router.navigate(['/']);
          });

      }).catch((potentialError) => {

          if (potentialError) {
              // console.error(potentialError);
          }

      });
  }
}

