'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../_Shared/Button';
import styled from 'styled-components';

function StartButton() {
  const router = useRouter();

  return (
    <Wrapper>
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
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

export default StartButton;
