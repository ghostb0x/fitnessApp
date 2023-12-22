'use client';
import React from 'react';
import SessionDashboard from '@/components/WorkoutScreen/SessionDashboard';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from '@/components/_Shared/Button';

export default function Workout() {
  const { endSession } = useSessionsContext();

  let currentSession = useBoundStore((state) => state.variables);

  React.useEffect(() => {
    console.log(currentSession);
    endSession(currentSession);

    // NOTE: Intentionally running effect only on component mount
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
      <p>{JSON.stringify(currentSession)}</p>
      <SessionDashboard />
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
  border: 1px solid white;
  padding: 30px;
  border-radius: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
`;
