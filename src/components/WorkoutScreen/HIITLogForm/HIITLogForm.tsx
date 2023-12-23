import * as React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import Form from '@/components/_Shared/Form';
import InputLabel from '@/components/_Shared/InputLabel';
import FormInput from '@/components/_Shared/FormInput';
import styled from 'styled-components';

interface Inputs {
  routineName: string;
  time: number | '';
  cardio: boolean;
  weight: number | '';
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
    control,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>({
    defaultValues: {
      routineName: 'Back Day',
      time: '',
      cardio: false,
      weight: '',
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
        time: '',
        cardio: false,
        weight: '',
      });
    }
  }, [formState, reset]);

  return (
    <Wrapper>
      <SectionTitle>Log HIIT Session</SectionTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="routine-name">Routine Name</InputLabel>
        <Controller
          name="routineName"
          control={control}
          render={({ field }) => (
            <FormInput
              id="routineName"
              type="select"
              {...field}
            >
              {Object.keys(Routines).map((routine) => (
                <option
                  key={routine}
                  value={routine}
                >
                  {routine}
                </option>
              ))}
            </FormInput>
          )}
        />

        <InputLabel htmlFor="time">Time Spent</InputLabel>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <FormInput
              id="time"
              type="number"
              {...field}
            />
          )}
        />

        <InputLabel htmlFor="cardio">Cardio</InputLabel>
        <Controller
          name="cardio"
          control={control}
          render={({ field }) => (
            <FormInput
              id="cardio"
              type="checkbox"
              {...field}
            />
          )}
        />

        <InputLabel htmlFor="weight">Weight Used</InputLabel>
        <Controller
          name="weight"
          control={control}
          render={({ field }) => (
            <FormInput
              id="weight"
              type="number"
              {...field}
            />
          )}
        />

        <FormInput
          id="submit"
          type="submit"
        />
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 15px;
  border: 1px solid white;
  border-radius: 15px;
  padding: 15px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
`;

export default HIITLogForm;
