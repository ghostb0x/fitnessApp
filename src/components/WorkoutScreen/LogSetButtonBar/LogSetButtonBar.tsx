import * as React from 'react';
import Button from '@/components/_Shared/Button';
import HIITLogForm from '../HIITLogForm';
import ExerciseLogForm from '../ExerciseLogForm';
import AddExerciseForm from '../AddExerciseForm';
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
  const [clicked, setClicked] = React.useState<
    focusAreaNames | 'HIIT' | null
  >(null);
  const [inputExercise, setInputExercise] = React.useState('');

  const { savedExercises, setSavedExercises } = useSessionsContext();

  React.useEffect(() => {
    // update localStorage var at 'savedExercises' with new value of
    // savedExercises state var after each update to savedExercises state var
    window.localStorage.setItem(
      'savedExercises',
      JSON.stringify(savedExercises)
    );

  }, [savedExercises]);

  // for opening edit mode to modify the list of exercises
  const [editMode, setEditMode] = React.useState(false);

  // for adding new exercise to savedExercises when in editMode (editMode === true)
  function addExercise(
    focusAreaName: focusAreaNames,
    newExercise: string
  ) {
    // push newExercise to state array at
    // savedExercises[focusAreaName][exercises].push(newExercise)
    setSavedExercises((prevExercises) => {
      const updatedExercises = structuredClone(prevExercises);
      if (updatedExercises[focusAreaName]) {
        updatedExercises[focusAreaName].exercises.push(newExercise);
      }
      return updatedExercises;
    });
  }

  // for removing specified exercise to savedExercises when in editMode (editMode === true)

  function removeExercise(
    focusAreaName: focusAreaNames,
    removalIndex: number
  ) {
    
    setSavedExercises((prevExercises) => {
      const updatedExercises = structuredClone(prevExercises);
      if (updatedExercises[focusAreaName]) {
        updatedExercises[focusAreaName].exercises.splice(
          removalIndex,
          1
        );
      }
      return updatedExercises;
    });
    
  }

  // create component to map over currentExercises var and display exercise name
  // and a remove button when in edit mode to remove exercise from currentExercise
  // also add an text input with "add" button to submit
  // submissions will update currentExercise
  function editExercisesMenu() {
    // Ensure currentExercises is defined and clicked is not null or 'HIIT'
    if (!currentExercises || clicked === null || clicked === 'HIIT') {
      return null;
    }

    return (
      <>
        {currentExercises.map((exercise, index) => (
          <div key={`${exercise}-${index}`}>
            {' '}
            {/* Unique Key */}
            {exercise}
            <button onClick={() => removeExercise(clicked, index)}>
              Remove
            </button>
          </div>
        ))}
        <AddExerciseForm
          focusAreaName={clicked}
          addExercise={addExercise}
        />
      </>
    );
  }

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
          clicked === 'HIIT' ? setClicked(null) : setClicked('HIIT');
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
                clicked === area
                  ? setClicked(null)
                  : setClicked(area);
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
      {editMode ? (
        editExercisesMenu()
      ) : currentExercises ? (
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

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
