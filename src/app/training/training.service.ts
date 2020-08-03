import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { Exercise } from "./exercise.model";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises(): Observable<Exercise[]> {
    return this.db.collection('availableExercises').snapshotChanges()
			.pipe(
				map( docArray => {
          console.info(docArray);
					return docArray.map( doc => {
						return {
							id: doc.payload.doc.id,
							... doc.payload.doc.data() as Exercise
						};
					});
        }),
        tap( exercises => this.availableExercises = exercises),
			);
		/* shorten alternative to get id filed mapped within the data object
		    this.db
          .collection('availableExercises')
          .valueChanges({ idField: 'id' })
          .subscribe((e : Exercise[]) => console.log(e));
		*/
  }

  startExercise(exerciseId: string) {
    this.runningExercise = this.availableExercises.find( e => e.id === exerciseId);
    this.exerciseChanged.next( { ...this.runningExercise } ); // firing a copy of the running exercise
  }

  completeExercise() {
    this.exercises.push( { ...this.runningExercise, endDate: new Date(), state: 'completed' } );
    this.runningExercise = null;
    this.exerciseChanged.next( null );
   }

  cancelExercise(progress: number) {
    this.exercises.push( {
      ...this.runningExercise,
      endDate: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
    } );
    this.runningExercise = null;
    this.exerciseChanged.next( null );
  }

  getRunningExercise() {
    return { ...this.runningExercise }; // returning a copy of the running exercise
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
