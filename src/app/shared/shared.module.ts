import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';

@NgModule({
  //imports: [],
  exports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule, // template-driven form in SignupComponent: ngForm, ngModel
    MaterialModule,

  ],
})
export class SharedModule { }
