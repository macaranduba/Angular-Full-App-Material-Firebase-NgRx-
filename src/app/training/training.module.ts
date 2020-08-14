import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { MaterialModule } from '../material.module';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-traning.component';
import { TrainingComponent } from './training.component';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
    TrainingComponent,
  ],
  imports: [
    AngularFirestoreModule, // firebase database
    BrowserModule,
    //CommonModule,
    FlexLayoutModule,
    FormsModule, // template-driven form in SignupComponent: ngForm, ngModel
    MaterialModule,
  ],
  exports: [],
  entryComponents: [ StopTrainingComponent ] // components that are neither instanriated by selector on HTML nor routing

})
export class TrainingModule { }
