'use client';
import * as React from 'react';
import SessionDashboard from '@/components/WorkoutScreen/SessionDashboard';
import styled from 'styled-components';
import { session } from '@/types/types';

function SummaryDisplay({session}: {session: session}) {

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

  const timeElapsed = formatAsTime(session.secondsElapsed);

  return (
    <>
      <TimeAndDifficulty>
        <Text>Time: {timeElapsed}</Text>
        <Text>Difficulty: {session.difficulty}</Text>
      </TimeAndDifficulty>
      <SectionTitle>🤸 Don&apos;t Forget to Stretch 🤸</SectionTitle>
      <SessionDashboard
        hiitSessions={session.hiitSessions}
        exercises={session.exercises}
      />
    </>
  );
}

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

export default SummaryDisplay;
