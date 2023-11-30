'use client';
import { sessionHistory } from '@/data/sessions';
import React from 'react';
import styled from 'styled-components';

function Calendar({saved}) {
  return (
    <div>
      <h2>Most recent workouts</h2>
      <List>
        {saved.map(({ date, focusAreas, hiitDuration }) => {
          return (
            <li key={date}>hoowa!
              <p key={date}>Date: {date}</p>hoowa!
              <p key={date}>Focus areas: {focusAreas.join(' + ')} </p>
              <p key={date}>HIIT Duration: {hiitDuration}</p>hoowa!
            </li>
          );
        })}
      </List>
    </div>
  );
}

const List = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

`;

export default Calendar;
