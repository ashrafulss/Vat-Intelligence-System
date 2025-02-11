import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VatOfficeRoutingModule } from './vat-office-routing.module';
import { VatOfficeComponent } from './vat-office/vat-office.component';
import { CommissionerateComponent } from './commissionerate/commissionerate.component';
import { AllExpandComponent } from './all-expand/all-expand.component';
import { LoadingImageModule } from '../../common/components/loading-image/loading-image.module';
import { UpdateComponent } from './update/update.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { DateFormat } from '../../common/pipes/date-format.pipe';
import { UcommissionerateComponent } from './update/ucommissionerate/ucommissionerate.component';


@NgModule({
  declarations: [
    VatOfficeComponent,
    CommissionerateComponent,
    AllExpandComponent,
    UpdateComponent,
    DateFormat,
    UcommissionerateComponent
   
  ],
  imports: [
    CommonModule,
    VatOfficeRoutingModule,
    LoadingImageModule,
    NgxPaginationModule,
    FormsModule
  
  ]
})
export class VatOfficeModule { }
