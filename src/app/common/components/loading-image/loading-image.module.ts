import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingImageComponent } from './loading-image.component';  // Make sure the correct path is used

@NgModule({
  declarations: [LoadingImageComponent],
  imports: [CommonModule],
  exports: [LoadingImageComponent]  // Export the component
})
export class LoadingImageModule { }
