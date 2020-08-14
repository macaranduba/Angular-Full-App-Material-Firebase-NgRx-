import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    AngularFireAuthModule,
    ReactiveFormsModule, // Reactive from in LoginComponent: formGroup,
    SharedModule,
  ],
  exports: [],
})
export class AuthModule { }
