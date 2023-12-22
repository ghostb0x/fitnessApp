import * as React from 'react';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import styled from 'styled-components';

function SessionDashboard() {
  let hiitSessions = useBoundStore(
    (state) => state.variables.hiitSessions
  );
  let exercises = useBoundStore((state) => state.variables.exercises);
  //unpack HIIT and Exercises, and format for display

  const displayHiit = hiitSessions.length ? (
    <div>
      <h3>HIIT Sessions</h3>
      {hiitSessions.map((session, index) => {
        const { routineName, time } = session;
        return (
          <p key={index}>
            Session {index + 1} {routineName} - {time} minutes
          </p>
        );
      })}
    </div>
  ) : null;

  const displayExercises = Object.keys(exercises).map(
    (exercise, index) => {
      const { name, sets, totalReps } = exercises[exercise];

      return (
        <div key={index}>
          <h3>{name}</h3>
          {sets.map((set, index) => (
            <p key={index}>
              Set {index + 1}: {set.reps} reps at {set.weight} lbs
            </p>
          ))}
          <p>Total = {totalReps}</p>
        </div>
      );
    }
  );

  return (
    <Wrapper>
      <Stats>
        {displayHiit}
        {displayExercises}
      </Stats>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 250px, 1fr;
`;
const Stats = styled.div`
  display: grid;
  /* want columns to repeat based on number of divs as children */
  grid-template-columns: 1fr;
`;

export default SessionDashboard;
