import { useSetRecoilState } from 'recoil';
import { TrackType } from '~/api/types/LibraryResponseType';
import { interruptingQueueSetter, playerState } from '~/stores/player';

export const usePlay = (trackData: TrackType) => {
  const setPlayer = useSetRecoilState(playerState);
  const setQueueHead = useSetRecoilState(interruptingQueueSetter);
};
