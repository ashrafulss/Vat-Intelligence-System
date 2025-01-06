import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MushakComponent } from './mushak/mushak.component';

const routes: Routes = [

  {path: '', component:MushakComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MushakRoutingModule { }
