import * as React from 'react';
import Button from '@/components/_Shared/Button';
import HIITLogForm from '../HIITLogForm';
import ExerciseLogForm from '../ExerciseLogForm';
import { focusAreas } from '@/data/focusAreas';
import { focusAreaNames } from '@/types/types';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import styled from 'styled-components';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';

// when button to Log Set is clicked
// 1 - creates an exercise shaped object
// 2 - updates the exercise object
// 3 - updates the currentSession
// 4 - and saves it to local storage

function LogSetButtonBar() {
  const [clicked, setClicked] = React.useState('');
  const [inputExercise, setInputExercise] = React.useState('');

  const { savedExercises } = useSessionsContext();

  React.useEffect(() => {
    // update localStorage with new exercises after each update to list
  }, [savedExercises]);

  // for opening edit mode to modify the list of exercises
  const [editMode, setEditMode] = React.useState(false);

  function editExercises() {}

  let selectedAreas = useBoundStore(
    (state) => state.variables.focusAreas
  );

  let currentExercises =
    savedExercises[clicked as focusAreaNames]?.exercises;

  return (
    <Wrapper>
      <SectionTitle>Log new set</SectionTitle>
      <Button
        onClick={() => {
          clicked === 'HIIT' ? setClicked('') : setClicked('HIIT');
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
                setInputExercise('');
                clicked === area ? setClicked('') : setClicked(area);
              }}
            >
              {area}
            </Button>
          ))
        : null}
      {clicked && clicked !== 'HIIT' ? (
        <Row>
          <Spacer />
          <SectionTitle>{clicked} Exercises</SectionTitle>
          <EditButton onClick={() => setEditMode(!editMode)}>
            +/-
          </EditButton>
        </Row>
      ) : null}{' '}
      {/* if edit mode is true, display edit component */}
      {/* else if false, display Buttons for setting setInputExercise */}
      {editMode ? null : currentExercises ? (
        currentExercises.map((exercise) => (
          <Button
            key={exercise}
            onClick={() =>
              inputExercise === exercise
                ? setInputExercise('')
                : setInputExercise(exercise)
            }
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

const Wrapper = styled.div``;

const SectionTitle = styled.h3`
  margin-top: 15px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
`;

const Row = styled.div`
  margin-top: 30px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Spacer = styled.div`
  width: 51px;
`;

const EditButton = styled.button`
  /* position: absolute;
  top: 0;
  right: 0;
   */
  border: none;
  border-radius: 10rem;
  padding: 0.5rem 1rem;

  background-color: cornflowerblue;
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 0.8rem;
  width: 51px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default LogSetButtonBar;
