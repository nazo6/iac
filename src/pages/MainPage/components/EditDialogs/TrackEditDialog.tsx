import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useAtomValue } from 'jotai/utils';

import { api } from '~/apis/api';
import { appInfo } from '~/appInfo';
import { authStateAtom } from '~/stores/app';
import { artistsStateSelector } from '~/stores/library';
import { TrackType } from '~/types/DataTypes';

type TrackEditDialogProps = {
  trackData: TrackType;
  open: boolean;
  onChanged: (changedTrackData: TrackType) => void;
  onClose: () => void;
};
const TrackEditDialog = (props: TrackEditDialogProps) => {
  const authState = useAtomValue(authStateAtom);
  const [pending, setPending] = React.useState(false);
  const artistState = useAtomValue(artistsStateSelector);
  const [newTrackDataState, setNewTrackDataState] = React.useState<
    TrackType & { track_no: number }
  >({ ...props.trackData, track_no: props.trackData.track });
  const [newArtistNameState, setNewArtistNameState] = React.useState<null | string>(
    props.trackData.artist ?? null,
  );
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit "{props.trackData.title}"</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          variant="standard"
          value={newTrackDataState.title}
          onChange={(e) => {
            setNewTrackDataState({ ...newTrackDataState, title: e.target.value });
          }}
        />
        <TextField
          margin="dense"
          label="Year"
          fullWidth
          variant="standard"
          type="number"
          value={newTrackDataState.year}
          onChange={(e) => {
            setNewTrackDataState({ ...newTrackDataState, year: Number(e.target.value) });
          }}
        />
        <TextField
          margin="dense"
          label="Track number"
          fullWidth
          variant="standard"
          type="number"
          value={newTrackDataState.track}
          onChange={(e) => {
            setNewTrackDataState({
              ...newTrackDataState,
              track_no: Number(e.target.value),
              track: Number(e.target.value),
            });
          }}
        />
        <TextField
          margin="dense"
          label="Artist"
          fullWidth
          variant="standard"
          value={newArtistNameState}
          onChange={(e) => {
            setNewArtistNameState(e.target.value);
          }}
        />
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
              : props.trackData.artist_id.toString();
            await api.API.update_track.$post({
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              },
              body: {
                _userid: authState!.user.user_id,
                _token: authState!.user.token,
                mode: 'update_track',
                tracks: [
                  {
                    ...newTrackDataState,
                    title: newTrackDataState.title,
                    year: newTrackDataState.year.toString(),
                    file_id: Number(props.trackData.id),
                    artist_id: Number(newArtistId),
                  },
                ],
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

export default TrackEditDialog;
