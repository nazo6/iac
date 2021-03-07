import * as React from 'react';

import { Box, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import useResizeObserver from 'use-resize-observer';

import type { TrackType } from '~/types/DataTypes';

import { Vlist } from './Vlist';

type ExplorerPropsType = {
  data: Array<
    | {
        type: 'track';
        fileData: TrackType;
      }
    | {
        type: 'folder';
        name: string;
        displayName?: string;
      }
  >;
  id: string;
  onTrackSelect?: (trackId: TrackType) => void;
  onAlbumSelect?: (albumId: number) => void;
  onArtistSelect?: (artistId: number) => void;
  onGenreSelect?: (genre: string) => void;
  onFolderSelect?: (folderName: string) => void;
};

const Explorer = (props: ExplorerPropsType) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
  return (
    <Box ref={ref} className="w-full h-full">
      <Vlist
        id={props.id}
        renderAhead={0}
        listWidth={width}
        listHeight={height}
        itemRenderer={(index, style) => {
          const data = props.data[index];
          if (data.type === 'folder') {
            return (
              <ListItem
                button
                title={'Folder ' + data.displayName ?? data.name}
                key={index}
                style={style}
                className="border"
                onClick={() =>
                  props.onFolderSelect ? props.onFolderSelect(data.name) : null
                }>
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText
                  primary={data.displayName ?? data.name}
                  classes={{
                    primary: 'whitespace-nowrap overflow-ellipsis overflow-hidden',
                  }}
                />
              </ListItem>
            );
          } else {
            return (
              <ListItem key={index} style={style} className="border">
                <Box>
                  <Typography
                    onClick={() => {
                      if (props.onTrackSelect) {
                        props.onTrackSelect(data.fileData);
                      }
                    }}>
                    {data.fileData.title}
                  </Typography>
                </Box>
              </ListItem>
            );
          }
        }}
        itemCount={props.data.length}
        calcItemHeight={() => 40}
      />
    </Box>
  );
};

export default Explorer;
