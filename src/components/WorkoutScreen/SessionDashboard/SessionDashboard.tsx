import * as React from 'react';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import styled from 'styled-components';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import {
  HiitSession,
  exercise,
  newExercisePayload,
} from '@/types/types';

interface IDashboardProps {
  displaySessionId: string;
  hiitSessions: HiitSession[];
  exercises: Record<string, exercise>;
}

function SessionDashboard({
  displaySessionId,
  hiitSessions,
  exercises,
}: IDashboardProps) {
  const { savedSessions, viewSelected } = useSessionsContext();

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
      const previouslyDone = savedSessions.findIndex((session) => {
        return Object.keys(session.exercises).includes(exercise);
      });

      let previousTotal: number = 0;
      let previousTotalComponent: React.JSX.Element | null = null;
      if (previouslyDone !== -1) {
        previousTotal =
          savedSessions[previouslyDone].exercises[exercise].totalReps;

        previousTotalComponent = (
          <p>(Previous Total: {previousTotal})</p>
        );
      }

      const { name, sets, totalReps } = exercises[exercise];

      return (
        <div key={index}>
          <h3>{name}</h3>
          {sets.map((set, index) => (
            <p key={index}>
              Set {index + 1}: {set.reps} reps at {set.weight} lbs
            </p>
          ))}
          <div>
            <p>Total = {totalReps}</p>
            {previouslyDone === -1
              ? null
              : displaySessionId !==
                  savedSessions[previouslyDone].id &&
                displaySessionId !== viewSelected?.id
              ? previousTotalComponent
              : null}
          </div>
        </div>
      );
    }
  );

  return (
    <Wrapper>
      <SectionTitle>Logged Sets</SectionTitle>
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

const SectionTitle = styled.h2`
  font-size: 18px;
  text-align: center;
`;

const Stats = styled.div`
  margin-top: 10px;
  border: 1px solid white;
  border-radius: 15px;
  padding: 20px;
  display: grid;
  /* want columns to repeat based on number of divs as children */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 50px;
`;

export default SessionDashboard;
