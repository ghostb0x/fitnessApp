'use client';
import React from 'react';
import LogSetButtonBar from '@/components/WorkoutScreen/LogSetButtonBar';
import SessionDashboard from '@/components/WorkoutScreen/SessionDashboard';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import styled from 'styled-components';


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
    <SectionWrapper>
      <SectionTitle>Well Done! You Did Great!</SectionTitle>
      <SessionDashboard />
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