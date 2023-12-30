import * as React from 'react';
import Button from '@/components/_Shared/Button';
import HIITLogForm from '../HIITLogForm';
import ExerciseLogForm from '../ExerciseLogForm';
import AddExerciseForm from '../AddExerciseForm';
import { focusAreaNames } from '@/types/types';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import styled from 'styled-components';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import EditButton from '../EditButton';

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
      <EditExerciseMenuWrapper>
        {currentExercises.map((exercise, index) => (
          <DeleteButton
            key={`${exercise}-${index}`}
            onClick={() => removeExercise(clicked, index)}
          >
            Delete {exercise} from {clicked} exercises
          </DeleteButton>
        ))}
        <AddExerciseForm
          focusAreaName={clicked}
          addExercise={addExercise}
        />
      </EditExerciseMenuWrapper>
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
          <EditButton
            title={`Add or delete exercises from ${clicked}`}
            onClick={() => setEditMode(!editMode)}
          />
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
  gap: 10px;
`;

const Spacer = styled.div`
  width: 51px;
`;

const EditExerciseMenuWrapper = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DeleteButton = styled.button`
  border: none;
  border-radius: 0.3rem;
  padding: 0.2rem 0.2rem;

  background-color: red;
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default LogSetButtonBar;
