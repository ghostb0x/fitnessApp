'use client';
import React from 'react';
import styled from 'styled-components';
import { formatDistanceToNow, parseJSON } from 'date-fns';
import Button from '../../_Shared/Button';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { session } from '@/types/types';
import { useRouter } from 'next/navigation';
import DeleteDialog from '@/components/_Shared/DeleteDialog';

interface IListItemCompProps {
  index: number;
  showAll: boolean;
  startTime: session['startTime'];
  focusAreas: session['focusAreas'];
  difficulty: session['difficulty'];
  onClick?: React.MouseEventHandler<HTMLElement>;
}

function ListItemComp({
  index,
  showAll,
  startTime,
  focusAreas,
  difficulty,
  onClick,
}: IListItemCompProps) {
  const { deleteSavedSession } = useSessionsContext();
  return (
    <ItemWrapper>
      <ListItem onClick={onClick}>
        <p>{formatDistanceToNow(parseJSON(startTime))} ago</p>
        <p>Focus areas: {focusAreas.join(' + ')} </p>
        <p>Difficulty: {difficulty}</p>
      </ListItem>
      {showAll ? (
        <DeleteDialog
          confirmFunction={() => {
            deleteSavedSession(index);
          }}
        >
          <DeleteButton title="Delete from history">
            Delete Session
          </DeleteButton>
        </DeleteDialog>
      ) : null}
    </ItemWrapper>
  );
}

function Calendar() {
  const { savedSessions, setViewSelected } = useSessionsContext();

  const [showAll, setShowAll] = React.useState(false);

  const router = useRouter();

  function viewSelectedSession(session: session) {
    setViewSelected(session);
    router.push('/viewPast');
  }

  const shortHistory = savedSessions
    .slice(0, 3)
    .map((session, index) => {
      return (
        <ListItemComp
          onClick={() => viewSelectedSession(session)}
          key={
            showAll.toString() + session.startTime.toString() + index
          }
          index={index}
          showAll={showAll}
          startTime={session.startTime}
          focusAreas={session.focusAreas}
          difficulty={session.difficulty}
        />
      );
    });

  const fullHistory = savedSessions.map((session, index) => {
    return (
      <ListItemComp
        onClick={() => viewSelectedSession(session)}
        key={
          showAll.toString() + session.startTime.toString() + index
        }
        index={index}
        showAll={showAll}
        startTime={session.startTime}
        focusAreas={session.focusAreas}
        difficulty={session.difficulty}
      />
    );
  });

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

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListItem = styled.li`
  position: relative;
  border: var(--color-primary) 3px solid;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: green;
  }
  width: 100%;
`;

const DeleteButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: red;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionWrapper = styled.section`
  border: 1px solid white;
  padding: 30px;
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export default Calendar;
