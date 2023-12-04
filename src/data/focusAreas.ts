import { focusAreaType } from '@/lib/types'

export const focusAreas: focusAreaType[] = [
  {
    id: 1,
    name: 'Legs',
    heavyMoves: ['Squats', 'Lunges', 'Glute Abductors (Out)', 'Glute Adductors (Squeeze)'],
  },
  {
    id: 2,
    name: 'Abs',
    heavyMoves: [],
    
  },
  {
    id: 3,
    name: 'Lower Back',
    heavyMoves: ['Deadlifts'],
  },
  {
    id: 4,
    name: 'Upper Back + Biceps',
    heavyMoves: ['Pull-ups', 'Curls'],
  },
  {
    id: 5,
    name: 'Chest',
    heavyMoves: ['Push-ups', 'Dips', 'Bench Press', 'Flys'],
  },
];
