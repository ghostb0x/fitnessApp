import * as React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import InputLabel from '@/components/_Shared/InputLabel';
import FormInput from '@/components/_Shared/FormInput';
import Form from '@/components/_Shared/Form';
import styled from 'styled-components';
import { focusAreaNames } from '@/types/types';

interface Inputs {
  exerciseName: string;
}

interface IAddExerciseForm {
  focusAreaName: focusAreaNames;
  addExercise: (
    focusAreaName: focusAreaNames,
    newExercise: string
  ) => void;
}

function AddExerciseForm({
  focusAreaName,
  addExercise,
}: IAddExerciseForm) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>({
    defaultValues: {
      exerciseName: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newExercise = data.exerciseName.trim();

    if (!newExercise) {
      throw new Error('Cannot submit empty value');
      return;
    }

    // update exercises list
    addExercise(focusAreaName, newExercise);
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        exerciseName: '',
      });
    }
  }, [formState, reset]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="exerciseName">Add New Exercise</InputLabel>
        <Controller
          name="exerciseName"
          control={control}
          rules={{ required: true }} // React Hook Form validation rule
          render={({ field }) => (
            <FormInput
              id="exerciseName"
              type="text"
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
  padding: 10px;
`;

export default AddExerciseForm;
