import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MushakRoutingModule } from './mushak-routing.module';
import { MushakComponent } from './mushak/mushak.component';


@NgModule({
  declarations: [
    MushakComponent
  ],
  imports: [
    CommonModule,
    MushakRoutingModule
  ]
})
export class MushakModule { }
