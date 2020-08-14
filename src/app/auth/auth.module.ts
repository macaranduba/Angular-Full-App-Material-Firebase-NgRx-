import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    //CommonModule,
    //FlexLayoutModule,
    FormsModule, // template-driven form in SignupComponent: ngForm, ngModel
    MaterialModule,
    ReactiveFormsModule, // Reactive from in LoginComponent: formGroup,

  ],
  exports: [],
})
export class AuthModule {

}
