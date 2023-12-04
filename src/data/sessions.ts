import { session } from '@/lib/types'

export const sessionHistory: session[] = [
  {
    date: '11/3/2023',
    startTime: '',    
    endTime: '',
    timeSpent: '',
    focusAreas: ['Lower Back', 'Upper Back + Biceps' ],
    hiitDuration: 20,
    difficulty: 5,
    heavyMoves: [
      {
        name: 'Pull-ups',
        totalReps: 47,
        sets: [
          {
            id: 1,
            reps: 15,
          },
          {
            id: 2,
            reps: 14,
          },
          {
            id: 3,
            reps: 10,
          },
          {
            id: 4,
            reps: 8,
          },
        ],
      },
    ],
  },
  {
    date: '11/2/2023',
    startTime: '',
    endTime: '',
    timeSpent: '',
    focusAreas: ['Legs'],
    hiitDuration: 30,
    difficulty: 7,
    heavyMoves: [],
  },
];
