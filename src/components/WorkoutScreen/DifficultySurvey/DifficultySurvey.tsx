import * as React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useBoundStore } from '@/hooks/state/useSessionStore';

function DifficultySurvey() {
  const updateDifficulty = useBoundStore(
    (state) => state.actions.updateDifficulty
  );

  const router = useRouter();

  function logDifficulty(score: number) {
    updateDifficulty(score);
    router.push('/postWorkout');
  }

  const Buttons = Array(10)
    .fill(0)
    .map((_, index) => {
      return (
        <SurveyButton
          key={index + 1}
          onClick={() => logDifficulty(index + 1)}
        >
          {index + 1}
        </SurveyButton>
      );
    });

  return (
    <SectionWrapper>
      <SectionTitle>How difficult was that?</SectionTitle>
      {Buttons}
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  border: 1px solid white;
  padding: 30px;
  border-radius: 10px;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
`;

const SurveyButton = styled.button`
  background-color: orangered;
  color: white;
  width: 25px;
  height: 25px;
  font-size: 15px;
`;

export default DifficultySurvey;
