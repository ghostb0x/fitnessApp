import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { set } from '@/types/types';
import { useBoundStore } from '@/hooks/state/useSessionStore';

interface ComponentProps {
  selectedExercise: string;
}

interface FormInputs {
  weight: number;
  reps: number;
}

function ExerciseLogForm({ selectedExercise }: ComponentProps) {
  let addNewExercise = useBoundStore(
    (state) => state.actions.addNewExercise
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<FormInputs>({
    defaultValues: {
      weight: 0,
      reps: 0,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newSet: set = {
      id: crypto.randomUUID(),
      reps: Number(data.reps),
      weight: Number(data.weight),
    };

    // send to reducer
    const payload = {
      exerciseName: selectedExercise,
      newSet: newSet,
    };

    addNewExercise(payload);
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        weight: 0,
        reps: 0,
      });
    }
  }, [formState, reset]);

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
