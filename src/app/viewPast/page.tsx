'use client';
import React from 'react';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Button from '@/components/_Shared/Button';
import SummaryDisplay from '@/components/_Shared/SummaryDisplay';

export default function ViewPast() {
  const { viewSelected } = useSessionsContext();

  const router = useRouter();

  function goHome() {
    router.push('/');
  }

  return (
    <SectionWrapper>
      <SectionTitle>Remember This?</SectionTitle>
      {viewSelected ? (
        <SummaryDisplay session={viewSelected} />
      ) : (
        <SectionTitle>
          Oops, looks like there was an error loading the saved
          session
        </SectionTitle>
      )}

      <Button
        onClick={goHome}
        color="purple"
      >
        Return Home
      </Button>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
  text-align: center;
`;
