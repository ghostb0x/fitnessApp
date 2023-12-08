import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


interface ComponentProps {
  exercise: string;
}

interface FormInputs {
  weight: number;
  reps: number;
}


function ExerciseLogForm({exercise}: ComponentProps) {
  const { register, handleSubmit } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <div>
      Log set: {exercise} #x 
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
