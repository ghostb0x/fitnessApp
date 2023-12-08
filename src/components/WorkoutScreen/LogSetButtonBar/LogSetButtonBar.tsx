import Button from '@/components/_Shared/Button';
import * as React from 'react';

interface ILogSetButtonBarProps {
  currentExercises: string[];
}

function LogSetButtonBar({
  currentExercises,
}: ILogSetButtonBarProps) {
  return (
    <div>
      <h3>Log new set:</h3>
      <Button>HIIT Workout</Button>
      {currentExercises ? currentExercises.map((exercise) => (
        <Button key={exercise}>{exercise}</Button>
      )) : null}
    </div>
  );
}

export default LogSetButtonBar;
