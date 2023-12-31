'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../_Shared/Button';
import styled from 'styled-components';
import { useBoundStore } from '@/hooks/state/useSessionStore';

function StartButton() {
  const router = useRouter();

  let selectedAreas = useBoundStore(
    (state) => state.variables.focusAreas
  );

  return (
    <Wrapper>
      <SelectedPlan>
        Today&apos;s Selected Focus Areas: {selectedAreas.join(', ')}
      </SelectedPlan>
      <Button
        onClick={() => {
          router.push('/workout');
        }}
        color={'#12b300'}
      >
        Start Workout
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
  border: 1px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
`;

const SelectedPlan = styled.p`
  width: 100%;
  text-align: center;
`;

export default StartButton;
