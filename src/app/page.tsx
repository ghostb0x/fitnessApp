'use client';
import React from 'react';
import styles from './page.module.css';
import SelectFocusArea from '@/components/StartScreen/SelectFocusArea';
import Calendar from '@/components/StartScreen/Calendar';
import StartButton from '@/components/StartScreen/StartButton';
import NextStepWindow from '@/components/_Shared/NextStepWindow';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import styled from 'styled-components';

export default function Home() {
  const { loadStored, loadSavedExercises } = useSessionsContext();

  React.useEffect(() => {
    loadStored();
    loadSavedExercises();
    // NOTE: Intentionally running effect only on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showNextStep, setShowNextStep] = React.useState(false);

  let selectedAreas = useBoundStore(
    (state) => state.variables.focusAreas
  );

  // display StartButton if focusareas has some item selected
  React.useEffect(() => {
    if (selectedAreas.length > 0) {
      setShowNextStep(true);
    }
  }, [selectedAreas]);

  return (
    <main className={styles.main}>
      <Calendar />
      <SelectFocusArea />
      {showNextStep ? (
        <NextStepWindow>
          <StartButton />
        </NextStepWindow>
      ) : null}
    </main>
  );
}
