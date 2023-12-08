import * as React from 'react';
import Button from '@/components/_Shared/Button';
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

  let currentExercises = focusAreas[clicked as focusAreaNames]?.exercises

  return (
    <div>
      <h3>Log new set:</h3>
      <Button onClick={() => clicked ? setClicked('') : setClicked('HIIT')}>HIIT Workout</Button>
      {selectedAreas
        ? selectedAreas.map((area) => (
            <Button
              key={area}
              onClick={() => clicked ? setClicked('') : setClicked(area)}
            >
              {area}
            </Button>
          ))
        : null}

      <p>{clicked} == {currentExercises}</p>
      {currentExercises
        ? currentExercises.map((exercise) => (
            <Button key={exercise}>{exercise}</Button>
          ))
        : null}
      {/* render appropriate action based on clicked */}
      {/* if HIIT clicked, render form */}
      {/* if focus area clicked, render exercises from that focus area */}
    </div>
  );
}

export default LogSetButtonBar;
