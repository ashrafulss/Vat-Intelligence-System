import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionExpiredRoutingModule } from './session-expired-routing.module';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { LoadingImageModule } from '../../common/components/loading-image/loading-image.module';


@NgModule({
  declarations: [
    SessionExpiredComponent
  ],
  imports: [
    CommonModule,
    SessionExpiredRoutingModule,
    LoadingImageModule
  ]
})
export class SessionExpiredModule { }
