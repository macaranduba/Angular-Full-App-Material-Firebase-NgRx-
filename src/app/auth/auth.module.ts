import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';

import { GoogleSheetsDbService } from 'ng-google-sheets-db';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { ExportDirective } from '../shared/Export.directive';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ExportDirective,
  ],
  imports: [
    AngularFireAuthModule,
    ReactiveFormsModule, // Reactive from in LoginComponent: formGroup,

    AuthRoutingModule,
    SharedModule,
  ],
  exports: [],
  providers: [ GoogleSheetsDbService ], //https://www.npmjs.com/package/ng-google-sheets-db
})
export class AuthModule { }
