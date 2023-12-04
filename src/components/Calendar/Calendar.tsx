'use client';
import { sessionHistory } from '@/data/sessions';
import { CalendarKey } from 'moment';
import React from 'react';
import styled from 'styled-components';
import { heavyMove, session } from '@/lib/types';

interface CalendarProps {
  savedSessions: session[];
}

function Calendar({ savedSessions }: CalendarProps) {
  return (
    <div>
      <h2>Most recent workouts</h2>
      <List>
        {savedSessions.map(
          ({ date, focusAreas, hiitDuration }, index) => {
            return (
              <li key={date + index}>
                <p key={date}>Date: {date}</p>
                <p key={date}>
                  Focus areas: {focusAreas.join(' + ')}{' '}
                </p>
                <p key={date}>HIIT Duration: {hiitDuration}</p>
              </li>
            );
          }
        )}
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
