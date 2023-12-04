'use client';
import Image from 'next/image';
import React from 'react';
import styles from './page.module.css';
import SelectFocusArea from '@/components/SelectFocusArea';
import Calendar from '@/components/Calendar';
import StartButton from '@/components/StartButton';
import { session, focusAreaNames } from '@/types/types';

export default function Home() {
  // need to move these into context - too many props on these components
  const [savedSessions, setSavedSessions] = React.useState<session[]>(
    []
  );
  const [selectedAreas, setSelectedAreas] = React.useState<
    focusAreaNames[]
  >([]);
  const [currentSession, setCurrentSession] =
    React.useState<session | null>(null);

  //initialize saved sessions from local storage - leave as empty array if none found
  React.useEffect(() => {
    const stored = window.localStorage.getItem('saved-sessions');
    if (stored) {
      setSavedSessions(JSON.parse(stored));
    }
  }, []);

  function deleteSavedSession(deleteIndex: number) {
    const filtered = savedSessions.filter((_, index) => index !== deleteIndex)
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

  return (
    <main className={styles.main}>
      <Calendar savedSessions={savedSessions} deleteSavedSession={deleteSavedSession} />
      <SelectFocusArea
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
      />
      <StartButton
        selectedAreas={selectedAreas}
        startSession={startSession}
      />
    </main>
  );
}
