'use client';
import * as React from 'react';
import { session } from '@/types/types';

type SessionsProviderValueType = ReturnType<
  typeof useSessionsManager
>;

const SessionsContext =
  React.createContext<SessionsProviderValueType | null>(null);

function useSessionsManager() {

  const [viewSelected, setViewSelected] = React.useState<session | null>(null)
  
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
      setSavedSessions(JSON.parse(stored));
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
