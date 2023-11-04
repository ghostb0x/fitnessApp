'use client';
import React from 'react';
import moment from 'moment';
import Button from '../Button';
import { focusAreas } from '@/data/focusAreas';
// actually comes from local storage
import { sessionHistory } from '@/data/sessions';

function StartButton({ selectedFocusAreas }) {
  // let today = moment().format('l');
  // let startTime = moment().format('LT');
  // focusAreas = [
  //   {
  //     id: 1,
  //     name: 'Legs',
  //     heavyMoves: [],
  //   },
  //   {

  let todaysHeavyMoves = [];
  if (selectedFocusAreas.length > 0) {

    selectedFocusAreas.forEach((selectedArea) => {
      const foundAreas = focusAreas.filter(
        (area) => area.name === selectedArea
        );
        foundAreas.forEach(({ heavyMoves }) =>
        todaysHeavyMoves.push(heavyMoves)
        );
      });
      
    }
  const newSession = {
    // date: today,
    // startTime: startTime,
    date: '',
    startTime: '',
    endTime: '',
    focusAreas: selectedFocusAreas,
    hiitDuration: 30,
    heavyMoves: todaysHeavyMoves,
    difficulty: 7,
  };

  function startSession(sesh) {
    sessionHistory.unshift(sesh);
  }

  return (
    <div>
      <p>The Plan: </p>
      <br/>
      <p>{todaysHeavyMoves}</p>
      <Button>Start Workout</Button>
    </div>
  );
}

export default StartButton;
