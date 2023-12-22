'use client';
import * as React from 'react';
import {
  session,
} from '@/types/types';

type SessionsProviderValueType = ReturnType<
  typeof useSessionsManager
>;

const SessionsContext =
  React.createContext<SessionsProviderValueType | null>(null);

function useSessionsManager() {
  const [currentSession, setCurrentSession] =
    React.useState<session | null>(null);

  function startSession(sesh: session) {
    setCurrentSession(sesh);
    const newSaves = structuredClone(savedSessions);
    newSaves.unshift(sesh);
    const stringifiedSaves = JSON.stringify(newSaves);
    window.localStorage.setItem('saved-sessions', stringifiedSaves);
    setSavedSessions(newSaves);
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
    savedSessions,
    setSavedSessions,
    currentSession,
    setCurrentSession,
    deleteSavedSession,
    startSession,
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
