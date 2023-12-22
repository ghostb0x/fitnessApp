import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useBoundStore } from '@/hooks/state/useSessionStore';

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
  let addNewHiitSession = useBoundStore(
    (state) => state.actions.addNewHiitSession
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>({
    defaultValues: {
      routineName: 'Back Day',
      time: 0,
      cardio: false,
      weight: 0,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newHIIT = {
      routineName: data.routineName,
      time: Number(data.time),
      cardio: data.cardio,
      weight: Number(data.weight),
    };

    // send to reducer
    addNewHiitSession(newHIIT);
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        routineName: 'Back Day',
        time: 0,
        cardio: false,
        weight: 0,
      });
    }
  }, [formState, reset]);

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
        <label htmlFor="cardio">Cardio</label>
        <input
          id="cardio"
          type="checkbox"
          {...register('cardio')}
        />

        <label htmlFor="weight">Weight Used</label>
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
