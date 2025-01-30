import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VatOfficeComponent } from './vat-office/vat-office.component';
import { CommissionerateComponent } from './commissionerate/commissionerate.component';
import { AllExpandComponent } from './all-expand/all-expand.component';
import { UpdateComponent } from './update/update.component';



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
      
      },
      {
        path: 'alldata',
        component: AllExpandComponent,
      
      },
      {
        path: 'update',
        component: UpdateComponent,
      
      },
      {
        path: '**',
        component: CommissionerateComponent,
    
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VatOfficeRoutingModule { }
