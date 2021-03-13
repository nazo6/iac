import * as React from 'react';

import { Box, Button, Typography } from '@material-ui/core';
import { withImmer } from 'jotai/immer';
import { useUpdateAtom } from 'jotai/utils';
import { useParams } from 'react-router-dom';

import Explorer from '~/components/Explorer';
import AlbumEditDialog from '~/components/editDialogs/AlbumEditDialog';
import { libraryStateAtom } from '~/stores/library';
import { playerStateAtom } from '~/stores/player';
import type { TrackType } from '~/types/DataTypes';
import { useFindAlbumDataById, useFindTrackDataById } from '~/utils/hooks/useFindData';

const libraryAtomWithImmer = withImmer(libraryStateAtom);

const Album = () => {
  const setPlayerState = useUpdateAtom(playerStateAtom);
  const setLibrary = useUpdateAtom(libraryAtomWithImmer);
  const [editDialogOpenState, setEditDialogOpenState] = React.useState(false);

  const { albumId } = useParams<{ albumId: string }>();
  const albumData = useFindAlbumDataById()(albumId);
  const findTrackData = useFindTrackDataById();
  const albumTracksData = albumData.tracks.map((trackId) =>
    findTrackData(trackId.toString()),
  );
  return (
    <>
      <Box className="h-full flex flex-col">
        <Box>
          <Typography fontSize="4xl">{albumData.name}</Typography>
          <Button onClick={() => setEditDialogOpenState(true)}>Edit</Button>
        </Box>
        <Box flex="1" minHeight="0">
          <Explorer
            id={`album-${albumId}`}
            data={albumTracksData.map((value) => {
              return {
                type: 'track',
                fileData: value as TrackType,
              };
            })}
            onTrackSelect={(trackData) => {
              setPlayerState({
                queue: albumTracksData,
                playIndex: albumTracksData.map((data) => data.id).indexOf(trackData.id),
                play: true,
              });
            }}
          />
        </Box>
      </Box>
      <AlbumEditDialog
        open={editDialogOpenState}
        albumData={albumData}
        onClose={() => setEditDialogOpenState(false)}
        onChanged={(newValue) => {
          setLibrary((draft) => {
            if (draft) {
              const thisAlbumIndex = draft.library.albums.findIndex(
                (value) => (value.id = albumId),
              );
              if (thisAlbumIndex) {
                draft.library.albums[thisAlbumIndex] = newValue;
              }
            }
          });
        }}
      />
    </>
  );
};
export default Album;
