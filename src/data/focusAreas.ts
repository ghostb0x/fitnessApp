import { focusAreaType } from '@/types/types';

export const focusAreas: focusAreaType[] = [
  {
    id: 1,
    name: 'Abs',
    imageSlug: '/assets/images/core-muscles.png',
    exercises: [],
  },
  {
    id: 2,
    name: 'Chest',
    imageSlug: '/assets/images/chest-muscles.png',
    exercises: ['Push-ups', 'Dips', 'Bench Press', 'Flys'],
  },
  {
    id: 3,
    name: 'Legs',
    imageSlug: '/assets/images/leg-muscles.png',
    exercises: [
      'Squats',
      'Lunges',
      'Glute Abductors (Out)',
      'Glute Adductors (Squeeze)',
    ],
  },
  {
    id: 4,
    name: 'Lower Back',
    imageSlug: '/assets/images/back-muscles.png',
    exercises: ['Deadlifts'],
  },
  {
    id: 5,
    name: 'Upper Back + Biceps',
    imageSlug: '/assets/images/upper-back-muscles.png',
    exercises: ['Pull-ups', 'Curls'],
  },

];
