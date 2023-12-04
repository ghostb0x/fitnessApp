'use client';
import Image from 'next/image';
import React from 'react';
import styles from './page.module.css';
import SelectFocusArea from '@/components/SelectFocusArea';
import Calendar from '@/components/Calendar';
import StartButton from '@/components/StartButton';

export default function Home() {
  // need to move these into context - too many props on these components
  const [savedSessions, setSavedSessions] = React.useState([]);
  const [selectedAreas, setSelectedAreas] = React.useState([]);
  const [currentSession, setCurrentSession] = React.useState({});

  //initialize saved sessions from local storage - leave as empty array if none found
  React.useEffect(() => {
    const stored = window.localStorage.getItem('saved-sessions');
    if (stored) {
      setSavedSessions(JSON.parse(stored));
    }
  }, []);

  function startSession(sesh) {
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
      <Calendar savedSessions={savedSessions} />
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
