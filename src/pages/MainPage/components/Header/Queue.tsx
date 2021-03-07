import * as React from 'react';

import { IconButton, List, ListItem, ListItemText, Popover } from '@material-ui/core';
import { FormatListBulleted } from '@material-ui/icons';
import { useAtomValue } from 'jotai/utils';

import { playerStateAtom } from '~/stores/player';

const Queue = () => {
  const playerStatus = useAtomValue(playerStateAtom);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  return (
    <>
      <IconButton
        aria-label="Open queue"
        disabled={!playerStatus}
        onClick={(e) => setAnchorEl(e.currentTarget)}>
        <FormatListBulleted />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <List>
          {playerStatus?.queue.map((trackData, index) => {
            return (
              <ListItem key={index}>
                <ListItemText primary={trackData.title} />
              </ListItem>
            );
          })}
        </List>
      </Popover>
    </>
  );
};

export default Queue;
