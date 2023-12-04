'use client';
import { focusAreas } from '@/data/focusAreas';
import React from 'react';
import styled from 'styled-components';
import { focusAreaNames, focusAreaType } from '@/types/types';
import SelectFocusAreaButton from '../SelectFocusAreaButton';

interface SelectedFocusAreasProps {
  selectedAreas: focusAreaNames[];
  setSelectedAreas: (focusAreas: focusAreaNames[]) => void;
}

function SelectFocusArea({
  selectedAreas,
  setSelectedAreas,
}: SelectedFocusAreasProps) {
  return (
    <>
      <div>
        <h2>Select Your Focus Areas</h2>
        <ButtonBlock>
          {focusAreas.map(
            ({ id, name, imageSlug }: focusAreaType) => {
              return (
                <SelectFocusAreaButton
                  key={id}
                  selectedAreas={selectedAreas}
                  setSelectedAreas={setSelectedAreas}
                  focusAreaName={name}
                  imageSlug={imageSlug}
                />
              );
            }
          )}
        </ButtonBlock>
      </div>
      <div>
        <h3>
          Today&apos;s Selected Focus Areas:{' '}
          {selectedAreas.join(', ')}
        </h3>
      </div>
    </>
  );
}

const ButtonBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default SelectFocusArea;
