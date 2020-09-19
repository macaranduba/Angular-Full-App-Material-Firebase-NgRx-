import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingComponent } from './training.component';


const routes: Routes = [
  { path: '', component: TrainingComponent }, // no path necessary because it would be appended to the
  // lazily loaded one, declared in app-routing.module.ts
];

@NgModule({
  imports: [
    RouterModule.forChild( routes ),
  ],
})
export class TrainingRoutingModule { }
