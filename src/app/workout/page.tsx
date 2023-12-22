'use client';
import React from 'react';
import LogSetButtonBar from '@/components/WorkoutScreen/LogSetButtonBar';
import SessionDashboard from '@/components/WorkoutScreen/SessionDashboard';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import styled from 'styled-components';
import EndWorkoutButton from '@/components/WorkoutScreen/EndWorkoutButton';
import Timer from '@/components/WorkoutScreen/Timer';

export default function Workout() {
  let startTime = new Date();
  let updateStartTime = useBoundStore(
    (state) => state.actions.updateStartTime
  );
  let currentSession = useBoundStore((state) => state.variables);

  React.useEffect(() => {
    updateStartTime(startTime);
    console.log(currentSession);
  }, []);

  return (
    <SectionWrapper>
      <SectionTitle>Time to Work Hard!</SectionTitle>
      <p>{JSON.stringify(currentSession)}</p>
      <Timer startTime={startTime} />
      <SessionDashboard />
      <LogSetButtonBar />
      <EndWorkoutButton />
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  border: 1px solid white;
  padding: 30px;
  border-radius: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
`;
