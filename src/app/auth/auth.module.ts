import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    //CommonModule,
    FlexLayoutModule,
    FormsModule, // template-driven form in SignupComponent: ngForm, ngModel
    MaterialModule,
    ReactiveFormsModule, // Reactive from in LoginComponent: formGroup,

  ],
  exports: [],
})
export class AuthModule {

}
