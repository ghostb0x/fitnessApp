import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  routineName: string;
  time: number;
  cardio: boolean;
  weight: number;
}

const Routines: Record<string, number> = {
  'Back Day': 0,
  'Leg Day': 0,
  'Cardio Abs': 0,
  'Six Pack Abs': 0,
};

function HIITLogForm() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      HIIT Session Inputs
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="routine-name">Routine Name</label>
        <select
          id="routine-name"
          {...register('routineName')}
        >
          {Object.keys(Routines).map((routine) => (
            <option
              key={routine}
              value={routine}
            >
              {routine}
            </option>
          ))}
        </select>
        <label htmlFor="time">Time Spent</label>
        <input
          id="time"
          type="number"
          {...register('time')}
        />
        <label>Cardio</label>
        <input
          id="cardio"
          type="checkbox"
          {...register('cardio')}
        />

        <label>Weight Used</label>
        <input
          id="weight"
          type="number"
          {...register('weight')}
        />

        <input type="submit" />
      </form>
    </div>
  );
}

export default HIITLogForm;
