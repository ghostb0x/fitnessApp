'use client';
import Image from 'next/image';
import React from 'react';
import styles from './page.module.css';
import SelectFocusArea from '@/components/SelectFocusArea';
import Calendar from '@/components/Calendar';
import StartButton from '@/components/StartButton';

export default function Home() {
  // need to move these into context - too many props on these components
  const [saved, setSaved] = React.useState([]);
  const [selectedAreas, setSelectedAreas] = React.useState([]);
  const [currentSession, setCurrentSession] = React.useState({});

  //initialize saved sessions from local storage - leave as empty array if none found
  React.useEffect(() => {
    const stored = window.localStorage.getItem('saved-sessions');
    if (stored) {
      setSaved(JSON.parse(stored));
    }
  }, []);


  function startSession(sesh) {
    setCurrentSession(sesh)
    const newSaves = structuredClone(saved);
    newSaves.unshift(sesh);
    const stringifiedSaves = JSON.stringify(newSaves);
    window.localStorage.setItem('saved-sessions', stringifiedSaves);
    setSaved(newSaves);

    // add change screen to show current workout interface
  }

  return (
    <main className={styles.main}>
      <Calendar saved={saved} />
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
