'use client';
import React from 'react';
import styles from './page.module.css';
import SelectFocusArea from '@/components/StartScreen/SelectFocusArea';
import Calendar from '@/components/StartScreen/Calendar';
import StartButton from '@/components/StartScreen/StartButton';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';

export default function Home() {
  const { loadStored } = useSessionsContext();

  React.useEffect(() => {
    loadStored();

    // NOTE: Intentionally running effect only on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <main className={styles.main}>
      <Calendar />
      <SelectFocusArea />
      <StartButton />
    </main>
  );
}
