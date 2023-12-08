'use client';
import React from 'react';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { session } from '@/types/types';
import Timer from '@/components/WorkoutScreen/Timer';
import LogSetButtonBar from '@/components/WorkoutScreen/LogSetButtonBar';

export default function Workout() {
  const {
    useSessionStore,
    updateStartTime,
    selectedAreas,
    startSession,
    currentSession,
  } = useSessionsContext();

  let getCurrentSession = useSessionStore.getState()
  React.useEffect(() => {
    // startSession(newSession);
    getCurrentSession = useSessionStore.getState()
  }, [getCurrentSession]);


  const startTime = new Date();
  updateStartTime(startTime);

  // create a reducer function and global state somewhere in context or using library
  // hold entire current session state in there
  // from form component, push new set into corresponding exercise.set array

  // want state to initialize at this point, not on initial

  React.useEffect(() => {
    // startSession(newSession);
    console.log(getCurrentSession)
  }, []);

  return (
    <div>
      <p>Im a workout page!</p>
      <p>{JSON.stringify(getCurrentSession)}</p>
      <Timer startTime={startTime} />
      <LogSetButtonBar />
    </div>
  );
}
