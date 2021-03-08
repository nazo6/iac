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

import { CacheImage } from '~/pages/MainPage/utils/CacheImage';
import getArtworkUrl from '~/pages/MainPage/utils/getArtworkUrl';
import type { TrackType } from '~/types/DataTypes';

import { Vlist } from './Vlist';

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

  const Item = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const data = props.data[index];
    if (data.type === 'folder') {
      return (
        <ListItem
          button
          title={'Folder ' + data.displayName ?? data.name}
          key={index}
          style={style}
          className="border"
          onClick={() => (props.onFolderSelect ? props.onFolderSelect(data.name) : null)}>
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
        <ListItem
          button
          key={index}
          style={style}
          className="border"
          onClick={() => {
            if (props.onTrackSelect) {
              props.onTrackSelect(data.fileData);
            }
          }}>
          <Grid container>
            <Grid
              xs={12}
              sm={6}
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
            <Hidden smDown>
              <Grid
                sm={3}
                item
                onClick={() => {
                  if (props.onAlbumSelect) {
                    props.onAlbumSelect(data.fileData.album_id);
                  }
                }}>
                <Typography className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                  {data.fileData.album}
                </Typography>
              </Grid>
            </Hidden>
            <Hidden only="xs">
              <Grid
                sm={3}
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
  };

  return (
    <Box ref={ref} className="w-full h-full">
      {props.data.length > 0 ? (
        <Vlist
          id={props.id}
          renderAhead={5}
          listWidth={width}
          listHeight={height}
          itemRenderer={(index, style) => (
            <Item index={index} style={style} key={index} />
          )}
          itemCount={props.data.length}
          calcItemHeight={() => 50}
        />
      ) : (
        <>No data</>
      )}
    </Box>
  );
};

export default Explorer;
