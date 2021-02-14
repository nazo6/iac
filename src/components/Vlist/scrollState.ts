import { atomFamily } from 'jotai/utils';

export const vlistScrollPositionStateFamily = atomFamily<string, null | number>((param) => null);
