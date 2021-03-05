import { atom } from 'jotai';

import { BaseResponseType } from '~/types/BaseResponseType';

import { atomWithSave } from './utils';

export const loginStateAtom = atom<
  { status: 'OK' | null } | { status: 'Error'; message: string }
>({ status: null });
export const authStateAtom = atomWithSave<BaseResponseType | null>({
  key: 'authState',
  defaultValue: null,
});

export const lastfmTokenStateAtom = atomWithSave<string | null>({
  key: 'lastfmTokenState',
  defaultValue: null,
});
