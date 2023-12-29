'use client';
import * as React from 'react';
import {
  session,
  focusAreaNames,
  focusAreaType,
} from '@/types/types';
import { focusAreas } from '@/data/focusAreas';

type SessionsProviderValueType = ReturnType<
  typeof useSessionsManager
>;

const SessionsContext =
  React.createContext<SessionsProviderValueType | null>(null);

function useSessionsManager() {
  // for viewing past session summaries on the /viewPast page
  const [viewSelected, setViewSelected] =
    React.useState<session | null>(null);


  // set default value of savedExercises
  const [savedExercises, setSavedExercises] =
    React.useState<Record<focusAreaNames, focusAreaType>>(focusAreas);

  function loadSavedExercises() {
    // on first load, check if localStorage var focusAreas is set
    const stored =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('savedExercises')
        : null;

    // if stored was not null, get focusAreas from /data/focusAreas
    if (stored) {
      let storedExercises: Record<focusAreaNames, focusAreaType> = JSON.parse(stored);
      setSavedExercises(storedExercises);
    }
  }

  const [savedSessions, setSavedSessions] = React.useState<session[]>(
    []
  );
  //initialize saved sessions from local storage
  // leave as empty array if none found
  const loadStored = () => {
    const stored =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('saved-sessions')
        : null;

    if (stored) {
      // for backfilling ids prior to implementing session ids
      let storedSessions: session[] = JSON.parse(stored);
      storedSessions.forEach((session) => {
        if (!!!Object.keys(session).includes('id')) {
          session.id = crypto.randomUUID();
        }
      });
      setSavedSessions(storedSessions);
    }
  };

  function deleteSavedSession(deleteIndex: number) {
    const filtered = savedSessions.filter(
      (_, index) => index !== deleteIndex
    );
    const stringifiedSaves = JSON.stringify(filtered);
    window.localStorage.setItem('saved-sessions', stringifiedSaves);
    setSavedSessions(filtered);
  }

  function endSession(sesh: session) {
    setSavedSessions((prevSessions) => {
      const newSaves = structuredClone(prevSessions);
      newSaves.unshift(sesh);
      const stringifiedSaves = JSON.stringify(newSaves);
      window.localStorage.setItem('saved-sessions', stringifiedSaves);
      return newSaves;
    });
  }

  return {
    savedSessions,
    setSavedSessions,
    deleteSavedSession,
    loadStored,
    endSession,
    viewSelected,
    setViewSelected,
    savedExercises,
    loadSavedExercises
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
