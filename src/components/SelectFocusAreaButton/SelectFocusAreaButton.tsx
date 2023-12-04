import * as React from 'react';
import Button from '../Button';
import Image from 'next/image';
import { focusAreaNames, focusAreaType } from '@/types/types';
import styled from 'styled-components';

interface SelectedFocusAreasProps {
  selectedAreas: focusAreaNames[];
  setSelectedAreas: (focusAreas: focusAreaNames[]) => void;
  focusAreaName: focusAreaNames;
  imageSlug: string;
}

function SelectFocusAreaButton({
  selectedAreas,
  setSelectedAreas,
  focusAreaName,
  imageSlug,
}: SelectedFocusAreasProps) {
  const [clicked, setClicked] = React.useState(false);

  return (
    <RectangleButton
      color={clicked ? '#12b300' : undefined}
      onClick={() => {
        // if already in list, clicking removes
        if (selectedAreas.some((area) => area === focusAreaName)) {
          const newFocusAreas = selectedAreas.filter(
            (area) => area !== focusAreaName
          );
          setSelectedAreas(newFocusAreas);
          setClicked(false);
        } else {
          // if name not in list, clicking adds
          const newFocusAreas = [...selectedAreas];
          newFocusAreas.push(focusAreaName);
          setSelectedAreas(newFocusAreas);
          setClicked(true);
        }
      }}
    >
      <ButtonContents>
        {focusAreaName}
        <Image
          src={imageSlug}
          alt={`${focusAreaName} Muscle Image`}
          height={230}
          width={110}
        />
      </ButtonContents>
    </RectangleButton>
  );
}

const RectangleButton = styled(Button)`
  border-radius: 10px;
  width: 302px;
`;
const ButtonContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export default SelectFocusAreaButton;
