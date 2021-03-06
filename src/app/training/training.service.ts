import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map, tap, catchError } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';

import { Exercise } from "./exercise.model";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises(): Observable<Exercise[]> {
    return this.db.collection('availableExercises').snapshotChanges()
			.pipe(
        catchError( error => {
          console.log( error );
          return of( null );
        }),
				map( docArray => {
          //console.info( docArray );
          if( docArray == null ) {
            return [];
          }
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
		this.db.doc('availableExercises/' + exerciseId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find( e => e.id === exerciseId);
    this.exerciseChanged.next( { ...this.runningExercise } ); // firing a copy of the running exercise
  }

  completeExercise() {
    this.addDataToDatabase( { ...this.runningExercise, endDate: new Date(), state: 'completed' } );
    this.runningExercise = null;
    this.exerciseChanged.next( null );
   }

  cancelExercise(progress: number) {
    this.addDataToDatabase( {
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

  fetchCompletedOrCancelledExercises(): Observable<Exercise[]> {
    return (this.db.collection('finishedExercises') as AngularFirestoreCollection<Exercise>).valueChanges()
      .pipe(
        catchError( error => {
          console.log( error );
          return of( [] );
        }),
        map( (exercises: Exercise[]) => {
          return exercises.map(exercise => {
            //console.log(exercise);
            return {
              ...exercise,
              endDate: ((exercise.endDate as unknown) as firebase.firestore.Timestamp).toDate(),
            };
          })
        })
      );
  }

  addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add( exercise );
  }
}
