import { session } from '@/types/types';

export const sessionHistory: session[] = [
  {
    date: '11/3/2023',
    startTime: '',
    endTime: '',
    timeSpent: '',
    focusAreas: ['Lower Back', 'Upper Back + Biceps'],
    hiitDuration: 20,
    difficulty: 5,
    exercises: {

      'Pull-ups': {
        name: 'Pull-ups',
        totalReps: 47,
        sets: [
          {
            id: "1",
            reps: 15,
            weight: 0,
          },
          {
            id: "2",
            reps: 14,
            weight: 0,
          },
          {
            id: "3",
            reps: 10,
            weight: 0,
          },
          {
            id: "4",
            reps: 8,
            weight: 0,
          },
        ],
      },
  },
  },
  {
    date: '11/2/2023',
    startTime: '',
    endTime: '',
    timeSpent: '',
    focusAreas: ['Legs'],
    hiitDuration: 30,
    difficulty: 7,
    exercises: [],
  },
];
