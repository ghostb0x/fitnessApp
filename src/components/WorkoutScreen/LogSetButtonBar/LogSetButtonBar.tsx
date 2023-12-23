import * as React from 'react';
import Button from '@/components/_Shared/Button';
import HIITLogForm from '../HIITLogForm';
import ExerciseLogForm from '../ExerciseLogForm';
import { focusAreas } from '@/data/focusAreas';
import { focusAreaNames } from '@/types/types';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import styled from 'styled-components';

// when button to Log Set is clicked
// 1 - creates an exercise shaped object
// 2 - updates the exercise object
// 3 - updates the currentSession
// 4 - and saves it to local storage

function LogSetButtonBar() {
  const [clicked, setClicked] = React.useState('');
  const [inputExercise, setInputExercise] = React.useState('');

  let selectedAreas = useBoundStore(
    (state) => state.variables.focusAreas
  );

  let currentExercises =
    focusAreas[clicked as focusAreaNames]?.exercises;

  return (
    <Wrapper>
      <SectionTitle>Log new set:</SectionTitle>
      <Button
        onClick={() => {
          setClicked('HIIT');
          setInputExercise('');
        }}
      >
        HIIT Workout
      </Button>
      {selectedAreas
        ? selectedAreas.map((area) => (
            <Button
              key={area}
              onClick={() => {
                setClicked(area);
                setInputExercise('');
              }}
            >
              {area}
            </Button>
          ))
        : null}

      <SectionTitle>{clicked && clicked !== 'HIIT' ? `${clicked} Exercises` : null} </SectionTitle>

      {currentExercises ? (
        currentExercises.map((exercise) => (
          <Button
            key={exercise}
            onClick={() => setInputExercise(exercise)}
          >
            {exercise}
          </Button>
        ))
      ) : clicked === 'HIIT' ? (
        <HIITLogForm />
      ) : null}

      {inputExercise ? (
        <ExerciseLogForm selectedExercise={inputExercise} />
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`

`;

const SectionTitle = styled.h3`
  margin-top: 15px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
`;

export default LogSetButtonBar;
