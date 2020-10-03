import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';
import { StoreModule } from '@ngrx/store';

// https://pt.stackoverflow.com/questions/332195/angular-6-data-e-hora-em-portugues
import localePt from '@angular/common/locales/pt';
import { registerLocaleData, DatePipe } from '@angular/common';
registerLocaleData(localePt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducer }  from './app.reducer';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './navigation/header/header.component';
import { MaterialModule } from './material.module';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { TrainingService } from './training/training.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase), // general firebase setup
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule, // captures the form default submission (page reload) [to be removed after spliting the TrainingModule]
    ReactiveFormsModule,                                            // [to be removed after spliting the TrainingModule]
    StoreModule.forRoot( {ui: appReducer} ),

    AppRoutingModule,
    MaterialModule,
    //TrainingModule, loaded lazily
  ],
  providers: [
    AuthService,
    DatePipe,
    TrainingService,
    { provide: LOCALE_ID, useValue: "pt" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
