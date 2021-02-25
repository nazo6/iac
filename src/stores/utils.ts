import { atomWithReducer } from 'jotai/utils';

export const atomWithSave = <T>({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: T;
}) => {
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
