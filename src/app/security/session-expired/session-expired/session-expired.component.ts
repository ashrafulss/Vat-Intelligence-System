import { Component } from '@angular/core';
import { OAuth2Service } from '../../../common/services/oauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrl: './session-expired.component.css'
})
export class SessionExpiredComponent {




  public isLoading: boolean = false;

  constructor(private router: Router, private oAuth2Service: OAuth2Service) { }

  ngOnInit(): void {
      if (this.oAuth2Service.oAuth2.isAccessTokenExpired()) {
          this.isLoading = true;
          this.router.navigate(['/login']);
      }
  }

}
