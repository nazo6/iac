import React from 'react';

import {
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { useAtomValue } from 'jotai/utils';
import { useDropzone } from 'react-dropzone';

import { api } from '~/apis/api';
import { appInfo } from '~/appInfo';
import { authStateAtom } from '~/stores/app';
import { ArtworkListType } from '~/types/DataTypes';

import { CacheImage } from '../../utils/CacheImage';
import getArtworkUrl from '../../utils/getArtworkUrl';

type ChangeImageDialogProps = {
  artworkId: number;
  tracks: number[];
  onClose: () => void;
  open: boolean;
};

const ChangeImageDialog = (props: ChangeImageDialogProps) => {
  const [tabState, setTabState] = React.useState(0);
  const authState = useAtomValue(authStateAtom);
  const [onlineArtworkState, setOnlineArtworkState] = React.useState<
    ArtworkListType | 'pending'
  >('pending');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
  });

  if (tabState === 2) {
    (async () => {
      if (onlineArtworkState === 'pending') {
        setOnlineArtworkState(
          (
            await api.API.get_artwork.$post({
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              },
              body: {
                _userid: authState!.user.user_id,
                _token: authState!.user.token,
                track_id: props.tracks[0],
                mode: 'get_artwork',
                client: appInfo.client,
                device_name: appInfo.deviceName,
                version: appInfo.version,
                supported_types: false,
              },
            })
          ).art,
        );
      }
    })();
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth="sm"
      classes={{ paper: 'h-full w-full' }}>
      <DialogTitle>Change artwork</DialogTitle>
      <DialogContent>
        <div className="flex flex-col">
          <div>
            <Tabs
              value={tabState}
              variant="scrollable"
              scrollButtons={true}
              onChange={(_, value) => {
                setTabState(value);
              }}
              aria-label="Upload type">
              <Tab label="Upload file" />
              <Tab label="Upload from url" />
              <Tab label="Select" />
            </Tabs>
          </div>
          <Box className="h-full w-full flex-1 overflow-auto">
            {tabState === 0 ? (
              <div className="p-2 max-w-xs" {...getRootProps()}>
                <input {...getInputProps()} />
                <CacheImage src={getArtworkUrl(props.artworkId, 'original')} />
                <img src={getArtworkUrl(props.artworkId, 'original')} />
              </div>
            ) : tabState === 1 ? (
              <div></div>
            ) : onlineArtworkState === 'pending' ? (
              <CircularProgress />
            ) : (
              <Box className="flex flex-row flex-wrap items-center justify-evenly gap-3">
                {onlineArtworkState.map((value) => {
                  return (
                    <>
                      <CacheImage src={getArtworkUrl(value.artwork_id, 'small')} />
                      <img
                        src={getArtworkUrl(value.artwork_id, 'small')}
                        className="w-120px h-120px"
                      />
                    </>
                  );
                })}
              </Box>
            )}
          </Box>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeImageDialog;
