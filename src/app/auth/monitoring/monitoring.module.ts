import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { PurchaseComparisonComponent } from './purchase-comparison/purchase-comparison.component';
import { PurchaseInformationComponent } from './purchase-information/purchase-information.component';
import { SalesInformationComponent } from './sales-information/sales-information.component';


@NgModule({
  declarations: [
    MonitoringComponent,
    PurchaseComparisonComponent,
    PurchaseInformationComponent,
    SalesInformationComponent
  ],
  imports: [
    CommonModule,
    MonitoringRoutingModule
  ]
})
export class MonitoringModule { }
