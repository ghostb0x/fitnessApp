'use client';
import * as React from 'react';
import {
  HiitSession,
  session,
  focusAreaNames,
  set,
} from '@/types/types';
import { create } from 'zustand';

type SessionsProviderValueType = ReturnType<
  typeof useSessionsManager
>;

const SessionsContext =
  React.createContext<SessionsProviderValueType | null>(null);

function useSessionsManager() {
  // selectedAreas is slightly unrelated to sessions - could be its own context
  // but it's small enough and they are used at different points in the app flow
  // so I think its okay to bundle
  const [selectedAreas, setSelectedAreas] = React.useState<
    focusAreaNames[]
  >([]);

  // ZUSTAND //
  // Create your store, which includes both state shape (session)
  //and (optionally) actions
  const useSessionStore = create<session>((set, get) => ({
    startTime: new Date(),
    endTime: new Date(),
    secondsElapsed: 0,
    focusAreas: selectedAreas,
    hiitSessions: [],
    exercises: {},
    difficulty: 0,
  }));

  //ensure the latest focusAreas are used, if they were to change
  React.useEffect(() => {
    useSessionStore.setState(() => ({ focusAreas: selectedAreas }));
  }, [selectedAreas, useSessionStore]);

  // Zustand Actions

  function updateStartTime(startTime: Date) {
    useSessionStore.setState(() => ({ startTime: startTime }));
  }

  function updateEndTime(endTime: Date) {
    useSessionStore.setState(() => ({ endTime: endTime }));
  }

  function updateSecondsElapsed(secondsElapsed: number) {
    useSessionStore.setState(() => ({
      secondsElapsed: secondsElapsed,
    }));
  }

  function updateHiitSessions(newHiitSession: HiitSession) {
    const { hiitSessions } = useSessionStore.getState();

    const newState = [...hiitSessions];
    newState.push(newHiitSession);
    useSessionStore.setState(() => ({ hiitSessions: newState }));

    console.log(useSessionStore.getState());
  }

  function updateDifficulty(difficulty: number) {
    useSessionStore.setState(() => ({ difficulty: difficulty }));
  }

  function updateExercises(payload: {
    exerciseName: string;
    newSet: set;
  }) {
    const { exercises } = useSessionStore.getState();
    // if key doesn't yet exist, create exercise obj
    if (exercises?.[payload.exerciseName] === undefined) {
      console.log('key not found');
      exercises[payload.exerciseName] = {
        name: payload.exerciseName,
        totalReps: 0,
        sets: [],
      };
    }
    // push new set and update total reps
    exercises?.[payload.exerciseName].sets.push(payload.newSet);
    exercises[payload.exerciseName].totalReps += payload.newSet.reps;

    console.log(useSessionStore.getState());
    // set new state
    useSessionStore.setState(() => ({ exercises: exercises }));
  }

  // end Zustand Actions

  const [currentSession, setCurrentSession] =
    React.useState<session | null>(null);

  function startSession(sesh: session) {
    setCurrentSession(sesh);
    const newSaves = structuredClone(savedSessions);
    newSaves.unshift(sesh);
    const stringifiedSaves = JSON.stringify(newSaves);
    window.localStorage.setItem('saved-sessions', stringifiedSaves);
    setSavedSessions(newSaves);

    // add change screen to show current workout interface
  }

  const [savedSessions, setSavedSessions] = React.useState<session[]>(
    []
  );

  //load saved sessions from local storage - leave as empty array if none found
  React.useEffect(() => {
    const stored = window.localStorage.getItem('saved-sessions');
    if (stored) {
      setSavedSessions(JSON.parse(stored));
    }
  }, []);

  function deleteSavedSession(deleteIndex: number) {
    const filtered = savedSessions.filter(
      (_, index) => index !== deleteIndex
    );
    setSavedSessions(filtered);
  }

  return {
    useSessionStore,
    updateStartTime,
    updateExercises,
    updateHiitSessions,
    savedSessions,
    setSavedSessions,
    currentSession,
    setCurrentSession,
    deleteSavedSession,
    startSession,
    selectedAreas,
    setSelectedAreas,
  };
}

export function SessionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionsContext.Provider value={useSessionsManager()}>
      {children}
    </SessionsContext.Provider>
  );
}

export function useSessionsContext() {
  const contextValues = React.useContext(SessionsContext);
  if (!contextValues) {
    throw 'You need to be within SessionsProvider to use useSessionsContext.';
  }
  return contextValues;
}
