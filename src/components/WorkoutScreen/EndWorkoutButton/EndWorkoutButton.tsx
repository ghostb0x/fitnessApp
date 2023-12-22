import Button from '@/components/_Shared/Button';
import * as React from 'react';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import { differenceInSeconds } from 'date-fns';
import DifficultySurvey from '@/components/WorkoutScreen/DifficultySurvey';

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
    <div>
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
    </div>
  );
}

export default EndWorkoutButton;
