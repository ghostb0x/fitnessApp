'use client';
import React from 'react';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { session } from '@/types/types';
import Timer from '@/components/WorkoutScreen/Timer';
import LogSetButtonBar from '@/components/WorkoutScreen/LogSetButtonBar';

export default function Workout() {
  const { selectedAreas, startSession, currentSession } =
    useSessionsContext();

  let startTime = new Date();

  // create a reducer function and global state somewhere in context or using library
  // hold entire current session state in there
  // from form component, push new set into corresponding exercise.set array

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

  return (
    <div>
      <p>Im a workout page!</p>
      <p>{JSON.stringify(currentSession)}</p>
      <Timer startTime={startTime} />
      <LogSetButtonBar />
    </div>
  );
}
