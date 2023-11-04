'use client';
import { sessionHistory } from '@/data/sessions';
import React from 'react';
import styled from 'styled-components';

function Calendar() {
  return (
    <div>
      <h2>Most recent workouts</h2>
      <List>
        {sessionHistory.map(({ date, focusAreas, hiitDuration }) => {
          return (
            <li key={date}>
              <p key={date}>Date: {date}</p>
              <p key={date}>Focus areas: {focusAreas.join(' + ')} </p>
              <p key={date}>HIIT Duration: {hiitDuration}</p>
            </li>
          );
        })}
      </List>
    </div>
  );
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

`;

export default Calendar;