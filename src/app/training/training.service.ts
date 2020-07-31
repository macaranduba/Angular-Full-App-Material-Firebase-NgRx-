import { Subject } from 'rxjs';

import { Exercise } from "./exercise.model";

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Abdominais', duration: 30, calories: 8 },
    { id: 'Touch Toes', name: 'Tocar dedos dos pés', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Flexão-Burpee ', duration: 60, calories: 8 }
  ];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice(); // returns a copy of the array, so that external code won't change this internal reference
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
