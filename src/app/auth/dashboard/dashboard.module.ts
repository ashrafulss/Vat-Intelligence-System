import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgChartsModule } from 'ng2-charts';
import { LoadingImageModule } from '../../common/components/loading-image/loading-image.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule,
    LoadingImageModule
  
    
    // BsDatepickerModule.forRoot()

    
  ]
})
export class DashboardModule { }
