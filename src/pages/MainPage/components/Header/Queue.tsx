import * as React from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  List,
  ListItem,
} from '@chakra-ui/react';
import { mdiFormatListBulleted } from '@mdi/js';
import Icon from '@mdi/react';
import { useAtomValue } from 'jotai/utils';

import { playerStateAtom } from '~/stores/player';

const Queue = () => {
  const playerStatus = useAtomValue(playerStateAtom);
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          aria-label="Open queue"
          icon={<Icon path={mdiFormatListBulleted} />}
          disabled={!playerStatus}
        />
      </PopoverTrigger>
      <PopoverContent>
        <List spacing={3}>
          {playerStatus?.queue.map((trackData, index) => {
            return <ListItem key={index}>{trackData.title}</ListItem>;
          })}
        </List>
      </PopoverContent>
    </Popover>
  );
};

export default Queue;
