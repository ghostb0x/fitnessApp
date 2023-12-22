import Button from '@/components/_Shared/Button';
import * as React from 'react';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import { differenceInSeconds  } from "date-fns";

function EndWorkoutButton() {

  const { endSession } = useSessionsContext();
  const currentSession = useBoundStore((state) => state.variables)
  const updateEndTime = useBoundStore((state) => state.actions.updateEndTime)
  const startTime = useBoundStore((state) => state.variables.startTime)
  const updateSecondsElapsed = useBoundStore((state) => state.actions.updateSecondsElapsed)

  // calls updateEndSession to get current time
  // then calculates secondsElapsed from start - end time and updates store
  // then pops up a survey to ask difficulty
  // all of this is then used to update session and save in storage / state
  // by calling endSession with the currentSession

  function handleEndSession() {
    const newEndTime = new Date()
    updateSecondsElapsed(differenceInSeconds(newEndTime, startTime))
    updateEndTime(newEndTime)

    endSession(currentSession)
  }
  return (
    <div>
      <Button onClick={handleEndSession} color="red">End Workout</Button>
    </div>
  );
}

export default EndWorkoutButton;
