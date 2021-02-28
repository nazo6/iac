import * as React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  List,
  ListItem,
} from '@chakra-ui/react';
import Icon from '@mdi/react';
import { mdiFormatListBulleted } from '@mdi/js';
import { useAtom } from 'jotai';
import { playerStateAtom } from '~/stores/player';

const Queue = () => {
  const [playerStatus, setPlayerStatus] = useAtom(playerStateAtom);
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
