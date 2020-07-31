import { Exercise } from "./exercise.model";

export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Abdominais', duration: 30, calories: 8 },
    { id: 'Touch Toes', name: 'Tocar dedos dos pés', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Flexão-Burpee ', duration: 60, calories: 8 }
  ];

  getAvailableExercises() {
    return this.availableExercises.slice(); // returns a copy of the array, so that external code won't change this internal reference
  }
}
