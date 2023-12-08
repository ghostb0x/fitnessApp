export interface session {
  startTime: Date;
  endTime: Date;
  timeSpent: Date;
  focusAreas: focusAreaNames[];
  hiitDuration: number;
  exercises: exercise[];
  difficulty: number;
}

export type focusAreaNames =
  | 'Legs'
  | 'Abs'
  | 'Lower Back'
  | 'Upper Back + Biceps'
  | 'Chest';

export interface focusAreaType {
  id: number;
  name: focusAreaNames;
  imageSlug: string;
  exercises: string[];
}

export interface set {
  id: string;
  reps: number;
  weight: number;
}

export interface exercise {
  name: string;
  totalReps: number;
  sets: set[];
}
