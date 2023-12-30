import Button from '@/components/_Shared/Button';
import * as React from 'react';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import { differenceInSeconds } from 'date-fns';
import DifficultySurvey from '@/components/WorkoutScreen/DifficultySurvey';
import styled from 'styled-components';

function EndWorkoutButton() {
  const [showSurvey, setShowSurvey] = React.useState(false);

  // session variables
  const updateEndTime = useBoundStore(
    (state) => state.actions.updateEndTime
  );
  const startTime = useBoundStore(
    (state) => state.variables.startTime
  );
  const updateSecondsElapsed = useBoundStore(
    (state) => state.actions.updateSecondsElapsed
  );

  // DifficultySurvey buttons will route to follow up page
  function handleEndSession() {
    const newEndTime = new Date();
    updateEndTime(newEndTime);
    updateSecondsElapsed(differenceInSeconds(newEndTime, startTime));
    setShowSurvey(true);
  }

  return (
    <>
      {showSurvey ? (
        <Wrapper>
        <DifficultySurvey />
        <SectionTitle>Not Finished Yet?</SectionTitle>
        <Button onClick={() => setShowSurvey(false)}>Go back</Button>
        </Wrapper>
      ) : (
        <Button
          onClick={handleEndSession}
          color="red"
        >
          End Workout
        </Button>
      )}
    </>
  );
}

const Wrapper = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.p`
  font-size: 25px;
  text-align: center;
`;

export default EndWorkoutButton;
