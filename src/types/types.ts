export interface session {
  startTime: Date;
  endTime: Date;
  secondsElapsed: number;
  focusAreas: focusAreaNames[];
  hiitSession: HiitSession[];
  exercises: Record<string, exercise>;
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

export interface HiitSession {
    routineName: string;
    time: number;
    cardio: boolean;
    weight: number;
}
