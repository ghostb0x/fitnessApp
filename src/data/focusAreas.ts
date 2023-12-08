import { focusAreaNames, focusAreaType } from '@/types/types';

export const focusAreas: Record<focusAreaNames,focusAreaType> = {
  'Abs': {
    id: 1,
    name: 'Abs',
    imageSlug: '/assets/images/core-muscles.png',
    exercises: [],
  },
  'Chest': {
    id: 2,
    name: 'Chest',
    imageSlug: '/assets/images/chest-muscles.png',
    exercises: ['Push-ups', 'Dips', 'Bench Press', 'Flys'],
  },
  'Legs': {
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
  'Lower Back': {
    id: 4,
    name: 'Lower Back',
    imageSlug: '/assets/images/back-muscles.png',
    exercises: ['Deadlifts'],
  },
  'Upper Back + Biceps': {
    id: 5,
    name: 'Upper Back + Biceps',
    imageSlug: '/assets/images/upper-back-muscles.png',
    exercises: ['Pull-ups', 'Curls'],
  },

};
