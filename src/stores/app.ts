import { atom } from 'jotai';
import { AuthResponseType } from '~/api/types/AuthResponseType';
import { atomWithSave } from './utils';

export const loginStateAtom = atom<
  { status: 'OK' | null } | { status: 'Error'; message: string }
>({ status: null });
export const authStateAtom = atomWithSave<AuthResponseType | null>({
  key: 'authState',
  defaultValue: null,
});

export const lastfmTokenStateAtom = atomWithSave<string | null>({
  key: 'lastfmTokenState',
  defaultValue: null,
});
