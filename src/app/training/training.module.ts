import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from '@angular/core';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-traning.component';
import { TrainingComponent } from './training.component';
import { SharedModule } from '../shared/shared.module';

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
    SharedModule,
  ],
  exports: [],
  entryComponents: [ StopTrainingComponent ] // components that are neither instanriated by selector on HTML nor routing

})
export class TrainingModule { }
