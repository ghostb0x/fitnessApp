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
      <SurveyWrapper>{Buttons}</SurveyWrapper>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
  text-align: center;
`;

const SurveyWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

`;

const SurveyButton = styled.button`
  background-color: orangered;
  color: white;
  width: 60px;
  height: 60px;
  font-size: 35px;
  text-align: center;
  border-radius: 15px;
`;

export default DifficultySurvey;
