import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';

@NgModule({
  //imports: [],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule, // template-driven form in SignupComponent: ngForm, ngModel
    MaterialModule,

  ],
})
export class SharedModule { }
