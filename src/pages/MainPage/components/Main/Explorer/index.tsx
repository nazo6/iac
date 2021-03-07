import * as React from 'react';

import {
  Avatar,
  Box,
  Grid,
  Hidden,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import useResizeObserver from 'use-resize-observer';

import getArtworkUrl from '~/pages/MainPage/utils/getArtworkUrl';
import type { TrackType } from '~/types/DataTypes';

import { Vlist } from './Vlist';
import { CacheImage } from '~/pages/MainPage/utils/CacheImage';

export type ExplorerDataType = Array<
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

type ExplorerPropsType = {
  data: ExplorerDataType;
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
        renderAhead={3}
        listWidth={width}
        listHeight={height}
        itemRenderer={(index, style) => {
          const data = props.data[index];
          if (data.type === 'folder') {
            return (
              <ListItem
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
                <Grid container>
                  <Grid
                    xs={12}
                    sm={8}
                    md={6}
                    item
                    onClick={() => {
                      if (props.onTrackSelect) {
                        props.onTrackSelect(data.fileData);
                      }
                    }}>
                    <div className="flex">
                      <CacheImage src={getArtworkUrl(data.fileData.artwork_id, 'icon')} />
                      <Avatar
                        variant="square"
                        className="p-1"
                        alt="Cover"
                        src={getArtworkUrl(data.fileData.artwork_id, 'icon')}
                      />
                      <Typography className="whitespace-nowrap overflow-ellipsis overflow-hidden flex-1 ml-1">
                        {data.fileData.title}
                      </Typography>
                    </div>
                  </Grid>
                  <Hidden only="xs">
                    <Grid
                      sm={4}
                      md={3}
                      item
                      onClick={() => {
                        if (props.onAlbumSelect) {
                          props.onAlbumSelect(data.fileData.album_id);
                        }
                      }}>
                      <Typography className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                        {data.fileData.artist}
                      </Typography>
                    </Grid>
                  </Hidden>
                </Grid>
              </ListItem>
            );
          }
        }}
        itemCount={props.data.length}
        calcItemHeight={() => 50}
      />
    </Box>
  );
};

export default Explorer;
