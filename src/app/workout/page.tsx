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
  let updateId = useBoundStore((state) => state.actions.updateId);
  
  let updateStartTime = useBoundStore(
    (state) => state.actions.updateStartTime
  );
  let { id, hiitSessions, exercises} = useBoundStore((state) => state.variables);

  React.useEffect(() => {
    updateStartTime(startTime);
    updateId(crypto.randomUUID())
    // NOTE: Intentionally running effect only on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SectionWrapper>
      <SectionTitle>Time to Work Hard!</SectionTitle>
      <Timer startTime={startTime} />
      <SessionDashboard displaySessionId={id} hiitSessions={hiitSessions} exercises={exercises} editMode={true}/>
      <LogSetButtonBar />
      <EndWorkoutButton />
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
  text-align: center;
`;
