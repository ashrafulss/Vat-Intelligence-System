import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { PurchaseComparisonComponent } from './purchase-comparison/purchase-comparison.component';
import { PurchaseInformationComponent } from './purchase-information/purchase-information.component';
import { SalesInformationComponent } from './sales-information/sales-information.component';

const routes: Routes = [
  {
    path: '',
    component: MonitoringComponent,
    children: [
      { path: 'purchase-comparison', component: PurchaseComparisonComponent },
      { path: 'purchase-information', component: PurchaseInformationComponent },
      { path: 'sales-information', component: SalesInformationComponent },
      { path: '', redirectTo: 'purchase-comparison', pathMatch: 'full' }, // Default child route
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
