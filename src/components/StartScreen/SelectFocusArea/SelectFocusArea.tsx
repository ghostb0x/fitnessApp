'use client';
import { focusAreas } from '@/data/focusAreas';
import React from 'react';
import styled from 'styled-components';
import { focusAreaType } from '@/types/types';
import SelectFocusAreaButton from '../SelectFocusAreaButton';
import { useBoundStore } from '@/hooks/state/useSessionStore';


function SelectFocusArea() {
  let selectedAreas = useBoundStore((state) => state.variables.focusAreas);


  return (
    <SectionWrapper>
      <SectionTitle>Select Your Focus Areas</SectionTitle>
      <ButtonBlock>
        {Object.values(focusAreas).map(({ id, name, imageSlug }: focusAreaType) => {
          return (
            <SelectFocusAreaButton
              key={id}
              focusAreaName={name}
              imageSlug={imageSlug}
            />
          );
        })}
      </ButtonBlock>
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
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding-bottom: 50px;
`;


export default SelectFocusArea;
