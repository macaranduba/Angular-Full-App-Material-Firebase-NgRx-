export interface Exercise {
  id: string;
  name: string;
  duration: number; // seconds
  calories: number;
  startDate?: Date; // it will have a value only when started
  state?: 'completed' | 'cancelled' | null;
}
