import { AngularFirestore, DocumentChangeType } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from './../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any>;

  constructor(private trainingService: TrainingService,
              private db: AngularFirestore) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }
}
