'use client';
import Image from 'next/image';
import React from 'react';
import styles from './page.module.css';
import SelectFocusArea from '@/components/SelectFocusArea';
import Calendar from '@/components/Calendar';
import StartButton from '@/components/StartButton';

export default function Home() {
  const [saved, setSaved] = React.useState([]);
  const [selectedAreas, setSelectedAreas] = React.useState([]);

  //initialize saved sessions from local storage - leave as empty array if none found
  React.useEffect(() => {
    const stored = window.localStorage.getItem('saved-sessions');
    if (stored) {
      setSaved(JSON.parse(stored));
    }
  }, []);



  return (
    <main className={styles.main}>
      <Calendar saved={saved} />
      <SelectFocusArea
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
      />
      <StartButton selectedAreas={selectedAreas} saved={saved} setSaved={setSaved} />
    </main>
  );
}
