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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UdivisionComponent } from './update/udivision/udivision.component';
import { UcircleComponent } from './update/ucircle/ucircle.component';
import { UtaxpayerComponent } from './update/utaxpayer/utaxpayer.component';


@NgModule({
  declarations: [
    VatOfficeComponent,
    CommissionerateComponent,
    AllExpandComponent,
    UpdateComponent,
    DateFormat,
    UcommissionerateComponent,
    UdivisionComponent,
    UcircleComponent,
    UtaxpayerComponent
   
  ],
  imports: [
    CommonModule,
    VatOfficeRoutingModule,
    LoadingImageModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule
  
  ]
})
export class VatOfficeModule { }
