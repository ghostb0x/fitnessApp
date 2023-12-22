'use client';
import React from 'react';
import styles from './page.module.css';
import SelectFocusArea from '@/components/StartScreen/SelectFocusArea';
import Calendar from '@/components/StartScreen/Calendar';
import StartButton from '@/components/StartScreen/StartButton';

export default function Home() {
  return (
    <main className={styles.main}>
      <Calendar />
      <SelectFocusArea />
      <StartButton />
    </main>
  );
}
