'use client';
import React from 'react';
import styled from 'styled-components';
import { formatDistanceToNow, parseJSON } from 'date-fns';
import Button from '../../_Shared/Button';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';

function Calendar() {
  const { savedSessions, deleteSavedSession } = useSessionsContext();

  const [showAll, setShowAll] = React.useState(false);

  const shortHistory = savedSessions
    .slice(0, 3)
    .map(({ startTime, focusAreas, difficulty }, index) => {
      return (
        <ListItem
          key={showAll.toString() + startTime.toString() + index}
        >
          <p>{formatDistanceToNow(parseJSON(startTime))} ago</p>
          <p>Focus areas: {focusAreas.join(' + ')} </p>
          <p>Difficulty: {difficulty}</p>
        </ListItem>
      );
    });

  const fullHistory = savedSessions.map(
    ({ startTime, focusAreas, difficulty }, index) => {
      return (
        <ListItem
          key={showAll.toString() + startTime.toString() + index}
        >
          <Spacer>
            <DeleteHistory
              title="Delete from history"
              onClick={() => deleteSavedSession(index)}
            >
              X
            </DeleteHistory>
          </Spacer>
          <p>{formatDistanceToNow(parseJSON(startTime))} ago</p>
          <p>Focus areas: {focusAreas.join(' + ')} </p>
          <p>Difficulty: {difficulty}</p>
        </ListItem>
      );
    }
  );

  return (
    <SectionWrapper>
      <Row>
        <SectionTitle>Most recent workouts</SectionTitle>
        <HistoryButton
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          {showAll ? 'Hide Full History' : 'Show Full History'}
        </HistoryButton>
      </Row>
      <List>{showAll ? fullHistory : shortHistory}</List>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  border: 1px solid white;
  padding: 30px;
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
`;

const HistoryButton = styled(Button)`
  width: fit-content;
`;

const List = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ListItem = styled.li`
  position: relative;
  border: var(--color-primary) 3px solid;
  padding: 10px;
  border-radius: 10px;
`;

const Spacer = styled.div`
  height: 15px;
`;

const DeleteHistory = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;

  width: 25px;
  height: 25px;
  background-color: green;
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Calendar;
