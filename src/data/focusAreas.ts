import { focusAreaType } from '@/types/types';

export const focusAreas: focusAreaType[] = [
  {
    id: 1,
    name: 'Legs',
    imageSlug: '/assets/images/leg-muscles.png',
    heavyMoves: [
      'Squats',
      'Lunges',
      'Glute Abductors (Out)',
      'Glute Adductors (Squeeze)',
    ],
  },
  {
    id: 2,
    name: 'Abs',
    imageSlug: '/assets/images/core-muscles.png',
    heavyMoves: [],
  },
  {
    id: 3,
    name: 'Lower Back',
    imageSlug: '/assets/images/back-muscles.png',
    heavyMoves: ['Deadlifts'],
  },
  {
    id: 4,
    name: 'Upper Back + Biceps',
    imageSlug: '/assets/images/back-muscles.png',
    heavyMoves: ['Pull-ups', 'Curls'],
  },
  {
    id: 5,
    name: 'Chest',
    imageSlug: '/assets/images/chest-muscles.png',
    heavyMoves: ['Push-ups', 'Dips', 'Bench Press', 'Flys'],
  },
];
