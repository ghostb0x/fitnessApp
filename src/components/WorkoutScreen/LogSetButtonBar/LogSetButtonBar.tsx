import * as React from 'react';
import Button from '@/components/_Shared/Button';
import HIITLogForm from '../HIITLogForm';
import ExerciseLogForm from '../ExerciseLogForm';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { focusAreas } from '@/data/focusAreas';
import { focusAreaNames } from '@/types/types';

//   // loop through focusAreas data set
//   // where focusAreas.name === clicked
//   // get exercises for focusArea and
//   // map buttons

// when button for exercise is clicked, creates an exercise shaped object
// each logged set updates the exercise object and updates the currentSession
// and saves it to local storage

function LogSetButtonBar() {
  const { selectedAreas, currentSession } = useSessionsContext();

  const [clicked, setClicked] = React.useState('');
  const [inputExercise, setInputExercise] = React.useState('');

  let currentExercises =
    focusAreas[clicked as focusAreaNames]?.exercises;

  return (
    <div>
      <h3>Log new set:</h3>
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

      <p>
        {clicked} == {currentExercises}
      </p>

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
        <ExerciseLogForm exercise={inputExercise} />
      ) : null}
    </div>
  );
}

export default LogSetButtonBar;
