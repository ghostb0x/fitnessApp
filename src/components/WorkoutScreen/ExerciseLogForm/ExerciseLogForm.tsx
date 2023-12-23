import * as React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { set } from '@/types/types';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import Form from '@/components/_Shared/Form';
import InputLabel from '@/components/_Shared/InputLabel';
import FormInput from '@/components/_Shared/FormInput';
import styled from 'styled-components';

interface ComponentProps {
  selectedExercise: string;
}

interface FormInputs {
  weight: number | "";
  reps: number | "";
}

function ExerciseLogForm({ selectedExercise }: ComponentProps) {
  let addNewExercise = useBoundStore(
    (state) => state.actions.addNewExercise
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<FormInputs>({
    defaultValues: {
      weight: "",
      reps: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const newSet: set = {
      id: crypto.randomUUID(),
      reps: Number(data.reps),
      weight: Number(data.weight),
    };

    const payload = {
      exerciseName: selectedExercise,
      newSet: newSet,
    };

    // send to Zustand store
    addNewExercise(payload);
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        weight: "",
        reps: "",
      });
    }
  }, [formState, reset]);

  return (
    <Wrapper>
      <SectionTitle>Log set: {selectedExercise}</SectionTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <InputLabel htmlFor="reps">Reps</InputLabel>
        <Controller
          name="reps"
          control={control}
          render={({ field }) => (
            <FormInput
              id="reps"
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

export default ExerciseLogForm;
