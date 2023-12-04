'use client';
import { focusAreas } from '@/data/focusAreas';
import React from 'react';
import Button from '../Button';
import styled from 'styled-components';


interface SeletedFocusAreasProps {
  selectedAreas: string[];
  setSelectedAreas: (focusAreas: string[]) => void;
}

  function SelectFocusArea({selectedAreas, setSelectedAreas}: SeletedFocusAreasProps) {
  
  return (
    <>
      <div>
        <h2>Select Your Focus Areas</h2>
        <ButtonBlock>

        {focusAreas.map(({ id, name }) => {
          return (
            <Button
            color='blue'
            key={id}
            onClick={() => {
              // if already in list, clicking removes
              if (selectedAreas.some((area) => area === name)) {
                const newFocusAreas = selectedAreas.filter(
                  (area) => area !== name
                  );
                  setSelectedAreas(newFocusAreas);
                } else {
                  // if name not in list, clicking adds
                  const newFocusAreas = [...selectedAreas];
                  newFocusAreas.push(name);
                  setSelectedAreas(newFocusAreas);
                }
              }}
            >
              {name}
            </Button>
          );
        })}
        </ButtonBlock>
      </div>
      <div>
        <h3>Today&apos;s Selected Focus Areas: {selectedAreas.join(", ")}</h3>
      </div>

    </>
  );
}

const ButtonBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


export default SelectFocusArea;
