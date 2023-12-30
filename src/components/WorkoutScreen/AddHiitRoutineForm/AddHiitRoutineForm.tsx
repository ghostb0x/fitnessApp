import * as React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import FormInput from '@/components/_Shared/FormInput';
import Form from '@/components/_Shared/Form';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import styled from 'styled-components';
import InputLabel from '@/components/_Shared/InputLabel';

interface Inputs {
  routineName: string;
}

function AddHiitRoutineForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>({
    defaultValues: {
      routineName: '',
    },
  });

  const { savedHiitRoutines, setSavedHiitRoutines } = useSessionsContext();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newRoutine = data.routineName.trim();

    if (!newRoutine) {
      throw new Error('Cannot submit empty value');
      return;
    }

    // update routines list
    setSavedHiitRoutines((prevRoutines) => {
      return [...prevRoutines, newRoutine];
    });
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        routineName: '',
      });
    }
  }, [formState, reset]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="routineName">Add New Routine</InputLabel>
        <Controller
          name="routineName"
          control={control}
          rules={{ required: true }} // React Hook Form validation rule
          render={({ field }) => (
            <FormInput
              id="routineName"
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

export default AddHiitRoutineForm;
