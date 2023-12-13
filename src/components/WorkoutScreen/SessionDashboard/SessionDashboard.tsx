import * as React from 'react';
import Timer from '@/components/WorkoutScreen/Timer';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { create, useStore} from 'zustand';

import styled from 'styled-components';

function SessionDashboard() {
  const { useSessionStore } = useSessionsContext();
  // let { startTime, exercises } = useSessionStore.getState();
  let startTime = useSessionStore((state) => state.startTime);
  let hiitSessions = useSessionStore((state) => state.hiitSessions);
  //unpack HIIT and Exercises, and format for display

  const displayHiit = hiitSessions.map((session, index) => {
    session.routineName;

    const text = `Set ${index + 1}: ${session.routineName} - ${
      session.time
    } minutes`;

    return <p key={index}>{text}</p>;
  });

  return (
    <Wrapper>
      <Timer startTime={startTime} />
      <Stats>{displayHiit}</Stats>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 250px, 1fr;
`;
const Stats = styled.div`
  display: grid;
  /* want columns to repeat based on number of exercises as children */
  grid-template-columns: 1fr;
`;

export default SessionDashboard;
