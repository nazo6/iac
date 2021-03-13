import * as React from 'react';

import {
  Avatar,
  Box,
  Grid,
  Hidden,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import useResizeObserver from 'use-resize-observer';

import type { TrackType } from '~/types/DataTypes';
import { CacheImage } from '~/utils/CacheImage';
import getArtworkUrl from '~/utils/getArtworkUrl';

import { Vlist } from './Vlist';

export type ExplorerDataType = Array<
  | {
      type: 'track';
      fileData: TrackType;
    }
  | {
      type: 'folder';
      id: string;
      displayName?: string;
    }
>;

type ExplorerPropsType = {
  data: ExplorerDataType;
  id: string;
  folderContextMenu?: React.ReactNode;
  fileContextMenu?: React.ReactNode;
  onTrackSelect?: (track: TrackType) => void;
  onAlbumSelect?: (albumId: number) => void;
  onArtistSelect?: (artistId: number) => void;
  onGenreSelect?: (genre: string) => void;
  onFolderSelect?: (folderId: string) => void;
};

const Explorer = (props: ExplorerPropsType) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
  const [fileContextMenuState, setFileContextMenuState] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>({
    mouseX: null,
    mouseY: null,
  });
  const [folderContextMenuState, setFolderContextMenuState] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>({
    mouseX: null,
    mouseY: null,
  });

  const Item = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const data = props.data[index];
    if (data.type === 'folder') {
      return (
        <ListItem
          button
          title={'Folder ' + data.displayName ?? data.id}
          key={'folder-' + index}
          style={style}
          className="border"
          onContextMenu={(event) => {
            if (fileContextMenuState) {
              event.preventDefault();
              setFolderContextMenuState({
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
              });
            }
          }}
          onClick={() => (props.onFolderSelect ? props.onFolderSelect(data.id) : null)}>
          <ListItemIcon>
            <Folder />
          </ListItemIcon>
          <ListItemText
            primary={data.displayName ?? data.id}
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
          key={'track-' + index}
          style={style}
          className="border"
          onContextMenu={(event) => {
            if (folderContextMenuState) {
              event.preventDefault();
              setFileContextMenuState({
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
              });
            }
          }}
          onClick={() => {
            if (props.onTrackSelect) {
              props.onTrackSelect(data.fileData);
            }
          }}>
          <Grid container>
            <Grid
              xs={12}
              sm={9}
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
                <Box className="whitespace-nowrap overflow-ellipsis overflow-hidden ml-1">
                  <Typography>{data.fileData.title}</Typography>
                  <Hidden mdUp>
                    <Typography>{data.fileData.album}</Typography>
                  </Hidden>
                </Box>
              </div>
            </Grid>
            <Hidden mdDown>
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
    <>
      <Box ref={ref} className="h-full w-full">
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
      {props.fileContextMenu ? (
        <Menu
          keepMounted
          open={fileContextMenuState.mouseY !== null}
          onClose={() => setFileContextMenuState({ mouseX: null, mouseY: null })}
          onClick={() => setFolderContextMenuState({ mouseX: null, mouseY: null })}
          anchorReference="anchorPosition"
          anchorPosition={
            fileContextMenuState.mouseY !== null && fileContextMenuState.mouseX !== null
              ? {
                  top: fileContextMenuState.mouseY,
                  left: fileContextMenuState.mouseX,
                }
              : undefined
          }>
          {props.fileContextMenu}
        </Menu>
      ) : (
        <></>
      )}
      {props.folderContextMenu ? (
        <Menu
          keepMounted
          open={folderContextMenuState.mouseY !== null}
          onClose={() => setFolderContextMenuState({ mouseX: null, mouseY: null })}
          onClick={() => setFolderContextMenuState({ mouseX: null, mouseY: null })}
          anchorReference="anchorPosition"
          anchorPosition={
            folderContextMenuState.mouseY !== null &&
            folderContextMenuState.mouseX !== null
              ? {
                  top: folderContextMenuState.mouseY,
                  left: folderContextMenuState.mouseX,
                }
              : undefined
          }>
          {props.folderContextMenu}
        </Menu>
      ) : (
        <></>
      )}
    </>
  );
};

export default Explorer;
