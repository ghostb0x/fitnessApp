import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import { exercise, set } from '@/types/types';

interface ComponentProps {
  selectedExercise: string;
}

interface FormInputs {
  weight: number;
  reps: number;
}

function ExerciseLogForm({ selectedExercise }: ComponentProps) {
  const { updateExercises, selectedAreas, currentSession } = useSessionsContext();

  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      weight: 0,
      reps: 0,
    },
  });
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newSet: set = {
      id: crypto.randomUUID(),
      reps: data.reps,
      weight: data.weight,
    };
    console.log(newSet);
    // send to reducer
    const payload = {
      exerciseName: selectedExercise,
      newSet: newSet,
    }

    console.log(payload)

    updateExercises(payload)

  };


  return (
    <div>
      Log set: {selectedExercise} #x
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="weight">Weight Used</label>
        <input
          id="weight"
          type="number"
          {...register('weight')}
        />

        <label htmlFor="reps">Reps</label>
        <input
          id="reps"
          type="number"
          {...register('reps')}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default ExerciseLogForm;
