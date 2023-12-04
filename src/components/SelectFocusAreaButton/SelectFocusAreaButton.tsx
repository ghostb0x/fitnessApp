import * as React from 'react';
import Button from '../Button';
import { focusAreaNames, focusAreaType } from '@/lib/types';

interface SelectedFocusAreasProps {
  selectedAreas: focusAreaNames[];
  setSelectedAreas: (focusAreas: focusAreaNames[]) => void;
  focusAreaName: focusAreaNames;
}

function SelectFocusAreaButton({
  selectedAreas,
  setSelectedAreas,
  focusAreaName,
}: SelectedFocusAreasProps) {


  const [clicked, setClicked] = React.useState(false)

  return (
    <Button
      color={clicked ? '#12b300' : undefined}
      onClick={() => {
        // if already in list, clicking removes
        if (selectedAreas.some((area) => area === focusAreaName)) {
          const newFocusAreas = selectedAreas.filter(
            (area) => area !== focusAreaName
          );
          setSelectedAreas(newFocusAreas);
          setClicked(false)
        } else {
          // if name not in list, clicking adds
          const newFocusAreas = [...selectedAreas];
          newFocusAreas.push(focusAreaName);
          setSelectedAreas(newFocusAreas);
          setClicked(true)
        }
      }}
    >
      {focusAreaName}
    </Button>
  );
}

export default SelectFocusAreaButton;
