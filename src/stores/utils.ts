import { atomWithReducer } from 'jotai/utils';
import { withImmer } from 'jotai/immer';

export const atomWithSave = <T>({ key, defaultValue }: { key: string; defaultValue: T }) => {
  const lsData = localStorage.getItem(key);
  let initialData: T;
  if (lsData) {
    initialData = JSON.parse(lsData);
  } else {
    initialData = defaultValue;
  }
  const state = atomWithReducer<T, T>(initialData, (_prev, newData: T) => {
    localStorage.setItem(key, JSON.stringify(newData));
    return newData;
  });
  state.debugLabel = key;
  return state;
};

export const atomWithSaveAndImmer = <T>({ key, defaultValue }: { key: string; defaultValue: T }) => {
  return withImmer(
    atomWithSave<T>({ key, defaultValue }),
  );
};
