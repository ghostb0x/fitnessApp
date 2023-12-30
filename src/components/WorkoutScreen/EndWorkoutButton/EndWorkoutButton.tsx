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
    <Wrapper>
      {showSurvey ? (
        <DifficultySurvey />
      ) : (
        <Button
          onClick={handleEndSession}
          color="red"
        >
          End Workout
        </Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default EndWorkoutButton;
