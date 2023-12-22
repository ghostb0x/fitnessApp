'use client';
import React from 'react';
import LogSetButtonBar from '@/components/WorkoutScreen/LogSetButtonBar';
import SessionDashboard from '@/components/WorkoutScreen/SessionDashboard';
import { useBoundStore } from '@/hooks/state/useSessionStore';

export default function Workout() {
  let updateStartTime = useBoundStore(
    (state) => state.actions.updateStartTime
  );
  let getCurrentSession = useBoundStore((state) => state.variables);

  React.useEffect(() => {
    updateStartTime(new Date());
    console.log(getCurrentSession);
  }, []);

  return (
    <div>
      <p>Im a workout page!</p>
      <p>{JSON.stringify(getCurrentSession)}</p>
      <SessionDashboard />
      <LogSetButtonBar />
    </div>
  );
}
