declare type CardioWorkout = {
  id: number;
  user_id: number;
  title: string;
  kilometers: number;
  minutes: number;
  created_at: string;
};

declare type Exercise = {
  id: number;
  name: string;
  sets: number;
  max_weight: number;
  reps: number;
};

declare type StrengthWorkout = {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  exercises:Exercise[];
};

declare type NoTypeExercise = {
  name: string;
  sets: number | "";
  maxWeight: number | "";
  reps: number | "";
};