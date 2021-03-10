import React from 'react';

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useAtomValue } from 'jotai/utils';

import { api } from '~/apis/api';
import { appInfo } from '~/appInfo';
import { authStateAtom } from '~/stores/app';
import { artistsStateSelector } from '~/stores/library';
import { AlbumType } from '~/types/DataTypes';

import { useFindTrackDataById } from '../../utils/useFindData';
import ChangeImageDialog from './ChangeImageDialog';

type AlbumEditDialogProps = {
  albumData: AlbumType;
  open: boolean;
  onChanged: (changedAlbumData: AlbumType) => void;
  onClose: () => void;
};
const AlbumEditDialog = (props: AlbumEditDialogProps) => {
  const authState = useAtomValue(authStateAtom);
  const [pending, setPending] = React.useState(false);
  const [changeImageDialogOpen, setChangeImageDialogOpen] = React.useState(false);
  const artistState = useAtomValue(artistsStateSelector);
  const artworkId = useFindTrackDataById()(props.albumData.tracks[0]).artwork_id;
  const [newAlbumDataState, setNewAlbumDataState] = React.useState(props.albumData);
  const [newArtistNameState, setNewArtistNameState] = React.useState<null | string>(
    props.albumData.artist ?? null,
  );
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit "{props.albumData.name}"</DialogTitle>
      <DialogContent>
        <ChangeImageDialog
          open={changeImageDialogOpen}
          tracks={props.albumData.tracks}
          artworkId={artworkId}
          onClose={() => setChangeImageDialogOpen(false)}
        />
        <div className="flex md:flex-row xs:flex-col items-center">
          <div>
            <Button onClick={() => setChangeImageDialogOpen(true)}>Change artwork</Button>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              variant="standard"
              value={newAlbumDataState.name}
              onChange={(e) => {
                setNewAlbumDataState({ ...newAlbumDataState, name: e.target.value });
              }}
            />
            <TextField
              margin="dense"
              label="Year"
              fullWidth
              variant="standard"
              type="number"
              value={newAlbumDataState.year}
              onChange={(e) => {
                setNewAlbumDataState({
                  ...newAlbumDataState,
                  year: Number(e.target.value),
                });
              }}
            />
            <Autocomplete
              className="w-full"
              options={artistState.map((value) => value.name)}
              style={{ width: 300 }}
              inputValue={newArtistNameState ?? ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  label="Artist"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setNewArtistNameState(e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <LoadingButton
          pending={pending}
          onClick={async () => {
            setPending(true);
            const newArtistId = newArtistNameState
              ? artistState.find((value) => value.name === newArtistNameState)?.id ??
                (
                  await api.API.create_artist.$post({
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    body: {
                      _userid: Number(authState!.user.user_id),
                      _token: authState!.user.token,
                      mode: 'create_artist',
                      name: newArtistNameState,
                      client: appInfo.client,
                      device_name: appInfo.deviceName,
                      version: appInfo.version,
                      supported_types: false,
                    },
                  })
                ).artist_id
              : props.albumData.artist_id.toString();
            await api.API.update_album.$post({
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              },
              body: {
                _userid: authState!.user.user_id,
                _token: authState!.user.token,
                mode: 'update_album',
                album_id: Number(props.albumData.id),
                artist_id: Number(newArtistId),
                name: newAlbumDataState.name,
                year: newAlbumDataState.year.toString(),
                client: appInfo.client,
                device_name: appInfo.deviceName,
                version: appInfo.version,
                supported_types: false,
              },
            });
            setPending(false);
            props.onClose();
          }}>
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AlbumEditDialog;
