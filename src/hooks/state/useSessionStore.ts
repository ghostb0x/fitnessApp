import {
  HiitSession,
  session,
  newExercisePayload,
} from '@/types/types';
import {
  createWithEqualityFn,
  useStoreWithEqualityFn,
} from 'zustand/traditional';

const defaultState: session = {
  startTime: new Date(),
  endTime: new Date(),
  secondsElapsed: 0,
  focusAreas: [],
  hiitSessions: [],
  exercises: {},
  difficulty: 0,
};
// Utility type (i.e. ts function) to generate action types from state shape
// Note - Property initially is of type "keyof T", which must be converted to type string
// for use as the argument of the Capitalize utility function. This is accomplished with the intersection
// operation, which occurs with "string & Property" as the arg for Capitalize
type ActionTypeFromStateShape<State> = {
  [Property in keyof State as `update${Capitalize<
    string & Property
  >}`]: (value: State[Property]) => void;
};

// Automatically generate action types from the state shape
// add in the specific adder functions that don't conform to
// utility type generated types
type SessionActions = ActionTypeFromStateShape<session> & {
  addNewHiitSession: (newSession: HiitSession) => void;
  addNewExercise: (newExercise: newExercisePayload) => void;
  reset: () => void;
};

// Combine state and actions for Zustand
interface ZustandType {
  variables: session;
  actions: SessionActions;
}

export const useBoundStore = <T>(
  selector: (state: ZustandType) => T
) => useStoreWithEqualityFn(useSessionStore, selector);

const useSessionStore = createWithEqualityFn<ZustandType>(
  (set, get) => ({
    variables: defaultState,
    actions: {
      updateStartTime: (startTime) =>
        set((state) => ({
          ...state,
          variables: { ...state.variables, startTime },
        })),
      updateEndTime: (endTime) =>
        set((state) => ({
          ...state,
          variables: { ...state.variables, endTime },
        })),
      updateSecondsElapsed: (secondsElapsed) =>
        set((state) => ({
          ...state,
          variables: { ...state.variables, secondsElapsed },
        })),
      updateFocusAreas: (focusAreas) =>
        set((state) => ({
          ...state,
          variables: { ...state.variables, focusAreas },
        })),
      updateHiitSessions: (hiitSessions) =>
        set((state) => ({
          ...state,
          variables: { ...state.variables, hiitSessions },
        })),
      updateExercises: (exercises) =>
        set((state) => ({
          ...state,
          variables: { ...state.variables, exercises },
        })),
      updateDifficulty: (difficulty) =>
        set((state) => ({
          ...state,
          variables: { ...state.variables, difficulty },
        })),

      addNewHiitSession: (newSession) =>
        set((state) => ({
          ...state,
          variables: {
            ...state.variables,
            hiitSessions: [
              ...state.variables.hiitSessions,
              newSession,
            ],
          },
        })),

      addNewExercise: (payload) => {
        try {
          const exercises = get().variables.exercises;
          const newState = { ...exercises };

          if (!payload.exerciseName || !payload.newSet) {
            // Handle the case of invalid input
            console.error('Invalid exercise data provided');
            return;
          }

          // if key doesn't yet exist, create exercise obj
          if (newState?.[payload.exerciseName] === undefined) {
            newState[payload.exerciseName] = {
              name: payload.exerciseName,
              totalReps: 0,
              sets: [],
            };
          }

          // push new set and update total reps
          newState[payload.exerciseName].sets.push(payload.newSet);
          newState[payload.exerciseName].totalReps +=
            payload.newSet.reps;

          set((state) => ({
            ...state,
            variables: {
              ...state.variables,
              exercises: newState,
            },
          }));
        } catch (error) {
          console.error('Error updating exercises', error);
        }
      },
      reset: () => {
        set((state) => ({ ...state, variables: defaultState }));
      },
    },
  })
);
