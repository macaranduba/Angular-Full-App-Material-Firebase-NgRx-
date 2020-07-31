export interface Exercise {
  id: string;
  name: string;
  duration: number; // seconds
  calories: number;
  endDate?: Date; // it will have a value only when completed
  state?: 'completed' | 'cancelled' | null;
}
