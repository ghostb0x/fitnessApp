import * as React from 'react';
import Button from '../../_Shared/Button';
import Image from 'next/image';
import { focusAreaNames } from '@/types/types';
import styled from 'styled-components';
import { useBoundStore } from '@/hooks/state/useSessionStore';


interface SelectedFocusAreasProps {
  focusAreaName: focusAreaNames;
  imageSlug: string;
}

function SelectFocusAreaButton({
  focusAreaName,
  imageSlug,
}: SelectedFocusAreasProps) {
  
  
  let selectedAreas = useBoundStore((state) => state.variables.focusAreas);
  let setSelectedAreas =  useBoundStore((state) => state.actions.updateFocusAreas);

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
          setSelectedAreas([...selectedAreas, focusAreaName]);
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
          priority={
            focusAreaName === 'Abs' || focusAreaName === 'Chest'
              ? true
              : false
          }
        />
      </ButtonContents>
    </RectangleButton>
  );
}

const RectangleButton = styled(Button)`
  margin-top: 0;
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
