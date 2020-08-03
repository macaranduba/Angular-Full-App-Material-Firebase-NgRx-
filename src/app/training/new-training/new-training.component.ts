import { AngularFirestore, DocumentChangeType } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

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
		this.exercises = this.db.collection('availableExercises').snapshotChanges()
			.pipe(
				map( docArray => {
          console.info(docArray);
					return docArray.map( doc => {
						return {
							id: doc.payload.doc.id,
							... doc.payload.doc.data() as Exercise
						};
					});
				})
			)
      /*.subscribe( result => {
        console.log( result);
      });*/
		/* shorten alternative to get id filed mapped within the data object
		    this.db
          .collection('availableExercises')
          .valueChanges({ idField: 'id' })
          .subscribe((e : Exercise[]) => console.log(e));
		*/
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }
}
