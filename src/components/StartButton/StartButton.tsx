'use client';
import React from 'react';
import moment from 'moment';
import Button from '../Button';
import {
  focusAreaNames,
  focusAreaType,
  heavyMove,
  session,
} from '@/types/types';
import { focusAreas } from '@/data/focusAreas';
// actually comes from local storage

interface StartButtonProps {
  selectedAreas: focusAreaNames[];
  startSession: (sesh: session) => void;
}

function StartButton({
  selectedAreas,
  startSession,
}: StartButtonProps) {
  let today = moment().format('l');
  let startTime = moment().format('LT');

  let todaysHeavyMoves: string[] = [];
  if (selectedAreas.length) {
    selectedAreas.forEach((selectedArea) => {
      const foundAreas = focusAreas.filter(
        (area) => area.name === selectedArea
      );
      foundAreas.forEach(({ heavyMoves }: focusAreaType) => {
        if (heavyMoves.length) {
          heavyMoves.forEach((heavyMove) =>
            todaysHeavyMoves.push(heavyMove)
          );
        }
      });
    });
  }
  const newSession: session = {
    date: today,
    startTime: startTime,
    endTime: '',
    timeSpent: '',
    focusAreas: selectedAreas,
    hiitDuration: 20,
    heavyMoves: [],
    difficulty: 0,
  };

  return (
    <div>
      <p>The Plan: </p>
      <br />
      <p>
        Today: {today} @ {startTime}
      </p>
      <p>Workout:</p>
      <p>Hiit Warmup</p>
      <p>and some of these: {todaysHeavyMoves.join(', ')}</p>
      <Button
        onClick={() => startSession(newSession)}
        color={'#12b300'}
      >
        Start Workout
      </Button>
    </div>
  );
}

export default StartButton;
