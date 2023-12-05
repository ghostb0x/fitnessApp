'use client';
import { focusAreas } from '@/data/focusAreas';
import React from 'react';
import styled from 'styled-components';
import { focusAreaType } from '@/types/types';
import SelectFocusAreaButton from '../SelectFocusAreaButton';
import { useSessionsContext } from '@/components/useSessionsProvider';

function SelectFocusArea() {
  const { selectedAreas } = useSessionsContext();

  return (
    <SectionWrapper>
      <SectionTitle>Select Your Focus Areas</SectionTitle>
      <ButtonBlock>
        {focusAreas.map(({ id, name, imageSlug }: focusAreaType) => {
          return (
            <SelectFocusAreaButton
              key={id}
              focusAreaName={name}
              imageSlug={imageSlug}
            />
          );
        })}
      </ButtonBlock>

      <SelectedPlan>
        Today&apos;s Selected Focus Areas: {selectedAreas.join(', ')}
      </SelectedPlan>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  margin-top: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
  text-align: center;
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SelectedPlan = styled.p`
  margin-top: 30px;
  width: 100%;
  text-align: center;
`;

export default SelectFocusArea;
