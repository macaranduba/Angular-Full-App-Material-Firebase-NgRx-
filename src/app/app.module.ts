import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';

// https://pt.stackoverflow.com/questions/332195/angular-6-data-e-hora-em-portugues
import localePt from '@angular/common/locales/pt';
import { registerLocaleData, DatePipe } from '@angular/common';
registerLocaleData(localePt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MaterialModule } from './material.module';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { TrainingComponent } from './training/training.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './training/current-training/stop-traning.component';
import { TrainingService } from './training/training.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentTrainingComponent,
    HeaderComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    TrainingComponent,
    SidenavListComponent,
    StopTrainingComponent,
    WelcomeComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase), // general firebase setup
    AngularFireAuthModule,
    AngularFirestoreModule, // firebase database
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule, // captures the form default submission (page reload) [to be removed after spliting the TrainingModule]
    ReactiveFormsModule,                                            // [to be removed after spliting the TrainingModule]

    AppRoutingModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    DatePipe,
    TrainingService,
    { provide: LOCALE_ID, useValue: "pt" },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ StopTrainingComponent ] // components that are neither instanriated by selector on HTML nor routing
})
export class AppModule { }
