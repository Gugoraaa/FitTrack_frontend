export type CardioWorkout = {
  id: number;
  user_id: number;
  title: string;
  kilometers: number;
  minutes: number;
  created_at: string;
};

type Exercise = {
  id: number;
  name: string;
  sets: number;
  max_weight: number;
  reps: number;
};

export type StrengthWorkout = {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  exercises:Exercise[];
};

type NoTypeExercise = {
  name: string;
  sets: number | "";
  maxWeight: number | "";
  reps: number | "";
};