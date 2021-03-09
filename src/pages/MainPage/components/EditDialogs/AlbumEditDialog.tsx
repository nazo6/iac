import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { TextFields } from '@material-ui/icons';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useAtomValue } from 'jotai/utils';

import { api } from '~/apis/api';
import { appInfo } from '~/appInfo';
import { authStateAtom } from '~/stores/app';
import { AlbumType } from '~/types/DataTypes';

type AlbumEditDialogProps = {
  albumData: AlbumType;
  open: boolean;
  onChanged: (changedAlbumData: AlbumType) => void;
  onClose: () => void;
};
const AlbumEditDialog = (props: AlbumEditDialogProps) => {
  const authState = useAtomValue(authStateAtom);
  const [pending, setPending] = React.useState(false);
  const [newAlbumDataState, setNewAlbumDataState] = React.useState(props.albumData);
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit "{props.albumData.name}"</DialogTitle>
      <DialogContent>
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
            setNewAlbumDataState({ ...newAlbumDataState, year: Number(e.target.value) });
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <LoadingButton
          pending={pending}
          onClick={async () => {
            setPending(true);
            await api.API.update_album.$post({
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              },
              body: {
                _userid: Number(authState!.user.user_id),
                _token: authState!.user.token,
                mode: 'update_album',
                album_id: Number(props.albumData.id),
                artist_id: newAlbumDataState.artist_id,
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
