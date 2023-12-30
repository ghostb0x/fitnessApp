import * as React from 'react';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import styled from 'styled-components';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { HiitSession, exercise } from '@/types/types';

interface IDashboardProps {
  displaySessionId: string;
  hiitSessions: HiitSession[];
  exercises: Record<string, exercise>;
  editMode?: boolean;
}

function SessionDashboard({
  displaySessionId,
  hiitSessions,
  exercises,
  editMode,
}: IDashboardProps) {
  const { savedSessions, viewSelected } = useSessionsContext();

  // use of allowEdits will depend on component prompt editMode == true
  const [allowEdits, setAllowEdits] = React.useState(false);

  const deleteExerciseSet = useBoundStore(
    (state) => state.actions.deleteExerciseSet
  );

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

      let previousTotalReps: number = 0;
      let previousMaxWeight: number = 0;
      let previousTotalComponent: React.JSX.Element | null = null;
      if (previouslyDone !== -1) {
        previousTotalReps =
          savedSessions[previouslyDone].exercises[exercise].totalReps;

        previousMaxWeight = savedSessions[previouslyDone].exercises[
          exercise
        ].sets.reduce(function (prev, current) {
          return prev && prev.weight > current.weight
            ? prev
            : current;
        }).weight;

        previousTotalComponent = (
          <p>
            (Previous Total: {previousTotalReps} | Max Weight:{' '}
            {previousMaxWeight})
          </p>
        );
      }

      const { name, sets, totalReps } = exercises[exercise];

      return (
        <SetDisplay key={index}>
          <h3>{name}</h3>
          {sets.map((set, index) => (
            <div key={index}>
              {allowEdits ? (
                <DeleteButton
                  onClick={() => deleteExerciseSet(name, index)}
                >
                  Delete Set {index + 1}: {set.reps} reps at {set.weight} lbs
                </DeleteButton>
              ) : <p>
              Set {index + 1}: {set.reps} reps at {set.weight} lbs
            </p>}
            </div>
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
        </SetDisplay>
      );
    }
  );

  return (
    <Wrapper>
      <SectionTitle>Logged Sets</SectionTitle>
      <Stats>
        {hiitSessions.length === 0 &&
        Object.keys(exercises).length === 0 ? (
          <PlaceholderText>Log a set below to track your workout</PlaceholderText>
        ) : (
          <>
            {editMode ? (
              <EditButton
                title='Delete a logged set'
                onClick={() => setAllowEdits(!!!allowEdits)}
              >
                📝
              </EditButton>
            ) : null}
            {displayHiit}
            {displayExercises}{' '}
          </>
        )}
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

const PlaceholderText = styled.p`
  text-align: center;

`

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

const EditButton = styled.button`
  /* position: absolute;
  top: 0;
  right: 0;
   */
  border: none;
  border-radius: 1rem;
  padding: 0.2rem 0.2rem;

  background-color: cornflowerblue;
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 1.5rem;
  width: 51px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const SetDisplay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  line-height: 0;
`;

const DeleteButton = styled.button`
  /* position: absolute;
  top: 0;
  right: 0;
   */
  border: none;
  border-radius: 1rem;
  padding: 0.2rem 0.2rem;

  background-color: red;
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default SessionDashboard;
