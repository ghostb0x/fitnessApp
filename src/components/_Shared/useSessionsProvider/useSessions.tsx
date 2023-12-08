'use client';
import * as React from 'react';
import { session, focusAreaNames } from '@/types/types';

type SessionsProviderValueType = ReturnType<
  typeof useSessionsManager
>;

const SessionsContext =
  React.createContext<SessionsProviderValueType | null>(null);

function useSessionsManager() {
  const [savedSessions, setSavedSessions] = React.useState<session[]>(
    []
  );

  //initialize saved sessions from local storage - leave as empty array if none found
  React.useEffect(() => {
    const stored = window.localStorage.getItem('saved-sessions');
    if (stored) {
      setSavedSessions(JSON.parse(stored));
    }
  }, []);

  const [currentSession, setCurrentSession] =
    React.useState<session | null>(null);

  function deleteSavedSession(deleteIndex: number) {
    const filtered = savedSessions.filter(
      (_, index) => index !== deleteIndex
    );
    setSavedSessions(filtered);
  }

  function startSession(sesh: session) {
    setCurrentSession(sesh);
    const newSaves = structuredClone(savedSessions);
    newSaves.unshift(sesh);
    const stringifiedSaves = JSON.stringify(newSaves);
    window.localStorage.setItem('saved-sessions', stringifiedSaves);
    setSavedSessions(newSaves);

    // add change screen to show current workout interface
  }

  // selectedAreas is slightly unrelated to sessions - could be its own context 
  // but it's small enough and they are used at different points in the app flow 
  // so I think its okay to bundle
  const [selectedAreas, setSelectedAreas] = React.useState<
    focusAreaNames[]
  >([]);

  return {
    savedSessions,
    setSavedSessions,
    currentSession,
    setCurrentSession,
    deleteSavedSession,
    startSession,
    selectedAreas,
    setSelectedAreas
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
