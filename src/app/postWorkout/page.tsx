'use client';
import React from 'react';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from '@/components/_Shared/Button';
import { isSameSecond } from 'date-fns';
import SummaryDisplay from '@/components/SummaryDisplay';

export default function PostWorkout() {
  let currentSession = useBoundStore((state) => state.variables);

  const { loadStored, endSession } = useSessionsContext();

  React.useEffect(() => {
    console.log("post workout effect ran")
    
    loadStored();

    /** checks that current session was not the initial store values
    where start and end times are identical
    start and end time should only be equal
    on direct page loads to postWorkout screen
    which come from viewing logged sessions via Calendar click
    or navigation errors where someone navs directly to postWorkout
    page without going through normal app routes */
    if (
      !isSameSecond(currentSession.endTime, currentSession.startTime)
    ) {
      endSession(currentSession);
    }

    /** NOTE: Intentionally running effect only on component mount */ 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  let resetState = useBoundStore((state) => state.actions.reset);

  const router = useRouter();

  function resetApp() {
    resetState();
    router.push('/');
  }

  return (
    <SectionWrapper>
      <SectionTitle>Well Done! You Did Great!</SectionTitle>

      <SummaryDisplay session={currentSession} />
      <Button
        onClick={resetApp}
        color="purple"
      >
        Return Home
      </Button>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
  text-align: center;
`;

