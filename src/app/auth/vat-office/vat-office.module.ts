import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VatOfficeRoutingModule } from './vat-office-routing.module';
import { VatOfficeComponent } from './vat-office/vat-office.component';
import { CommissionerateComponent } from './commissionerate/commissionerate.component';
import { AllExpandComponent } from './all-expand/all-expand.component';
import { LoadingImageModule } from '../../common/components/loading-image/loading-image.module';



@NgModule({
  declarations: [
    VatOfficeComponent,
    CommissionerateComponent,
    AllExpandComponent
  ],
  imports: [
    CommonModule,
    VatOfficeRoutingModule,
    LoadingImageModule
  ]
})
export class VatOfficeModule { }
