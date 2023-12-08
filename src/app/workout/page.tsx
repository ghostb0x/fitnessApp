'use client';
import React from 'react';
import moment from 'moment';
import { formatDistance, parseJSON } from 'date-fns';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { session } from '@/types/types';
import Timer from '@/components/WorkoutScreen/Timer';
import LogSetButtonBar from '@/components/WorkoutScreen/LogSetButtonBar';
import HIITLogForm from '@/components/WorkoutScreen/HIITLogForm';
import ExerciseLogForm from '@/components/WorkoutScreen/ExerciseLogForm';
import { focusAreas } from '@/data/focusAreas';

export default function Workout() {
  const { selectedAreas, startSession, currentSession } =
    useSessionsContext();

  let startTime = new Date();
  let currentExercises: string[] = [];

  selectedAreas.forEach((area) => {
    // loop through focusAreas data set
    // where focusAreas.name === area
    // get exercises for focusArea and add to
    // currentExercises
    focusAreas.forEach((focusArea) => {
      if (focusArea.name === area) {
        currentExercises = [
          ...currentExercises,
          ...focusArea.exercises,
        ];
      }
    });
  });

  //   {
  //     id: 1,
  //     name: 'Abs',
  //     imageSlug: '/assets/images/core-muscles.png',
  //     exercises: [],
  //   },

  const newSession: session = {
    startTime: startTime,
    endTime: startTime,
    timeSpent: startTime,
    focusAreas: selectedAreas,
    hiitDuration: 0,
    exercises: [],
    difficulty: 0,
  };

  React.useEffect(() => {
    startSession(newSession);
  }, []);

  //will neeed to get the following from context
  //current session
  //setSavedSessions (to update current session data)
  //start session should occur on useEffect after initial load
  //move start time into that useEffect for more accurate start time
  return (
    <div>
      <p>Im a workout page!</p>
      <p>{JSON.stringify(currentSession)}</p>
      <Timer startTime={startTime} />
      <LogSetButtonBar currentExercises={currentExercises}/>
      <HIITLogForm />
      <ExerciseLogForm />
    </div>
  );
}
