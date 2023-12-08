import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  weight: number;
  reps: number;
}

function ExerciseLogForm() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      Log set: [input here] #x 
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
