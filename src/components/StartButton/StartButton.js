'use client';
import React from 'react';
import moment from 'moment';
import Button from '../Button';
import { focusAreas } from '@/data/focusAreas';
// actually comes from local storage
import { sessionHistory } from '@/data/sessions';

function StartButton({ selectedFocusAreas }) {
  let today = moment().format('l');
  let startTime = moment().format('LT');

  let todaysHeavyMoves = [];
  if (selectedFocusAreas.length) {
    selectedFocusAreas.forEach((selectedArea) => {
      const foundAreas = focusAreas.filter(
        (area) => area.name === selectedArea
      );
      foundAreas.forEach(({ heavyMoves }) => {
        if (heavyMoves.length) {
          heavyMoves.forEach((heavyMove) => todaysHeavyMoves.push(heavyMove));
        }
      });
    });
  }
  const newSession = {
    date: today,
    startTime: startTime,
    endTime: '',
    focusAreas: selectedFocusAreas,
    hiitDuration: 20,
    heavyMoves: todaysHeavyMoves,
    difficulty: 7,
  };

  function startSession(sesh) {
    sessionHistory.unshift(sesh);
  }

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
      <Button>Start Workout</Button>
    </div>
  );
}

export default StartButton;
