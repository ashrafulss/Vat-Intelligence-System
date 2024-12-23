import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VatOfficeComponent } from './vat-office/vat-office.component';
import { CommissionerateComponent } from './commissionerate/commissionerate.component';
import { AllExpandComponent } from './all-expand/all-expand.component';



// const routes: Routes = [
//   {path: '', component: VatOfficeComponent,
//     children:[
//       {path: 'commissionerate', component: CommissionerateComponent},
//       {path: 'alldata', component:AllExpandComponent},
//       {path: '**', component:CommissionerateComponent}
//     ]
//   }
// ];


const routes: Routes = [
  {
    path: '',
    component: VatOfficeComponent,
    children: [
      {
        path: 'commissionerate',
        component: CommissionerateComponent,
        data: { animation: 'CommissioneratePage' }  // Set the animation name for this route
      },
      {
        path: 'alldata',
        component: AllExpandComponent,
        data: { animation: 'AllDataPage' }  // Set the animation name for this route
      },
      {
        path: '**',
        component: CommissionerateComponent,
        data: { animation: 'CommissioneratePage' }  // Default animation if path doesn't match
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VatOfficeRoutingModule { }
