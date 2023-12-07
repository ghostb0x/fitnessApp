'use client';
import React from 'react';
import moment from 'moment';
import { formatDistance, parseJSON } from 'date-fns'
import { useSessionsContext } from '@/components/useSessionsProvider';
import { session } from '@/types/types';
import Timer from '@/components/Timer';

export default function Workout() {
  const { selectedAreas, startSession, currentSession } = useSessionsContext();

//   convert to date-fns
  let startTime = new Date()

  const newSession: session = {
    startTime: startTime,
    endTime: startTime,
    timeSpent: startTime,
    focusAreas: selectedAreas,
    hiitDuration: 0,
    heavyMoves: [],
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
      <Timer startTime={startTime}/>
    </div>
  );
}
