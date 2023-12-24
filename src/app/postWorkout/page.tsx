'use client';
import React from 'react';
import SessionDashboard from '@/components/WorkoutScreen/SessionDashboard';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from '@/components/_Shared/Button';
import { isSameSecond } from 'date-fns';

export default function Workout() {
  let currentSession = useBoundStore((state) => state.variables);

  const { loadStored, endSession } = useSessionsContext();

  React.useEffect(() => {
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

  function formatAsTime(seconds: number) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;

    let displayTime =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0');

    return displayTime;
  }

  const timeElapsed = formatAsTime(currentSession.secondsElapsed);

  const difficulty = currentSession.difficulty;

  let resetState = useBoundStore((state) => state.actions.reset);

  const router = useRouter();

  function resetApp() {
    resetState();
    router.push('/');
  }

  return (
    <SectionWrapper>
      <SectionTitle>Well Done! You Did Great!</SectionTitle>

      <TimeAndDifficulty>
        <Text>Time: {timeElapsed}</Text>
        <Text>Difficulty: {difficulty}</Text>
      </TimeAndDifficulty>
      <SectionTitle>🤸 Don&apos;t Forget to Stretch 🤸</SectionTitle>
      <SessionDashboard hiitSessions={currentSession.hiitSessions} exercises={currentSession.exercises}/>
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

const TimeAndDifficulty = styled.div`
  border: 1px solid white;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 25px;
  text-align: center;
`;
