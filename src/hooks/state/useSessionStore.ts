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
  id: 'current',
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
  deleteHiitSession: (deleteIndex: number) => void;
  addNewExercise: (newExercise: newExercisePayload) => void;
  deleteExerciseSet: (
    exerciseName: string,
    deleteIndex: number
  ) => void;
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
      updateId: (newId) =>
        set((state) => ({
          ...state,
          variables: { ...state.variables, id: newId },
        })),
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
      deleteHiitSession: (deleteIndex) => {
        try {
          const hiitSessions = get().variables.hiitSessions;

          // Check if deleteIndex is within the range of the sets array
          if (deleteIndex < 0 || deleteIndex >= hiitSessions.length) {
            throw new Error(
              `Invalid deleteIndex: ${deleteIndex}. Must be within the range of logged sessions.`
            );
          }

          const filteredSessions = hiitSessions.filter(
            (_, index) => index !== deleteIndex
          );
          set((state) => {
            return {
              ...state,
              variables: {
                ...state.variables,
                hiitSessions: filteredSessions,
              },
            };
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error(
              'Error in deleteHiitSession:',
              error.message
            );
          } else {
            console.error(
              'An unexpected error occurred in deleteHiitSession:',
              error
            );
          }
        }
      },
      addNewExercise: (payload) => {
        try {
          if (!payload.exerciseName || !payload.newSet) {
            // Handle the case of invalid input
            console.error('Invalid exercise data provided');
            return;
          }

          const exercises = get().variables.exercises;
          const newState = { ...exercises };

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
      deleteExerciseSet: (exerciseName, deleteIndex) => {
        try {
          const exercises = get().variables.exercises;

          // Check if the exercise exists
          if (!exercises[exerciseName]) {
            throw new Error(
              `Exercise named '${exerciseName}' not found.`
            );
          }

          const currentExercise = { ...exercises[exerciseName] };

          // Check if deleteIndex is within the range of the sets array
          if (
            deleteIndex < 0 ||
            deleteIndex >= currentExercise.sets.length
          ) {
            throw new Error(
              `Invalid deleteIndex: ${deleteIndex}. Must be within the range of available sets.`
            );
          }

          currentExercise.totalReps -=
            currentExercise.sets[deleteIndex].reps;

          const filteredSets = currentExercise.sets.filter(
            (_, index) => index !== deleteIndex
          );
          set((state) => {
            // Create a copy of the current exercises
            const newExercises = { ...state.variables.exercises };

            if (filteredSets.length === 0) {
              // Remove the exercise entry entirely
              delete newExercises[exerciseName];
            } else {
              // Update the sets of the current exercise
              newExercises[exerciseName] = {
                ...currentExercise,
                sets: filteredSets,
              };
            }

            return {
              ...state,
              variables: {
                ...state.variables,
                exercises: newExercises,
              },
            };
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error(
              'Error in deleteExerciseSet:',
              error.message
            );
          } else {
            console.error(
              'An unexpected error occurred in deleteExerciseSet:',
              error
            );
          }
        }
      },
      reset: () => {
        set((state) => ({ ...state, variables: defaultState }));
      },
    },
  })
);
