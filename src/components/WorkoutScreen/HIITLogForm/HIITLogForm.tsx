import * as React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useBoundStore } from '@/hooks/state/useSessionStore';
import Form from '@/components/_Shared/Form';
import InputLabel from '@/components/_Shared/InputLabel';
import FormInput from '@/components/_Shared/FormInput';
import styled from 'styled-components';
import { useSessionsContext } from '@/components/_Shared/useSessionsProvider';
import EditButton from '../EditButton';
import AddHiitRoutineForm from '../AddHiitRoutineForm';

interface Inputs {
  routineName: string;
  time: number | '';
  cardio: boolean;
  weight: number | '';
}

function HIITLogForm() {
  const { savedHiitRoutines, setSavedHiitRoutines } =
    useSessionsContext();

  let addNewHiitSession = useBoundStore(
    (state) => state.actions.addNewHiitSession
  );

  const [editMode, setEditMode] = React.useState(false);

  // remove routine from list of options
  function removeHiitRoutine(deleteIndex: number) {
    // Check if deleteIndex is within the range of the sets array
    if (deleteIndex < 0 || deleteIndex >= savedHiitRoutines.length) {
      throw new Error(
        `Invalid deleteIndex: ${deleteIndex}. Must be within the range of saved HIIT routines.`
      );
    }

    setSavedHiitRoutines((prevRoutines) => {
      const newRoutines = [...prevRoutines];
      newRoutines.splice(deleteIndex, 1);
      return newRoutines;
    });
  }

  function EditHiitRoutinesMenu() {

    return (
      <EditHiitRoutinesMenuWrapper>
        {savedHiitRoutines.map((routine, index) => (
          <DeleteButton
            key={`${routine}-${index}`}
            onClick={() => removeHiitRoutine(index)}
          >
            Delete {routine} from routines list
          </DeleteButton>
        ))}
        <AddHiitRoutineForm />
      </EditHiitRoutinesMenuWrapper>
    );
  }

  React.useEffect(() => {
    // update localStorage var at 'hiitRoutines' with new value of
    // savedHiitRoutines state var after each update to savedHiitRoutines state var
    window.localStorage.setItem(
      'hiitRoutines',
      JSON.stringify(savedHiitRoutines)
    );
  }, [savedHiitRoutines]);

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

    // update Zustand store
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
      <PositionedEditButton
        title="Edit HIIT routine selection"
        onClick={() => setEditMode(!editMode)}
      />
      {editMode ? <EditHiitRoutinesMenu /> : null}
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
              {savedHiitRoutines.map((routine) => (
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

  position: relative;
`;

const PositionedEditButton = styled(EditButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
`;

const EditHiitRoutinesMenuWrapper = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DeleteButton = styled.button`
  border: none;
  border-radius: 0.3rem;
  padding: 0.2rem 0.2rem;

  background-color: red;
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default HIITLogForm;
